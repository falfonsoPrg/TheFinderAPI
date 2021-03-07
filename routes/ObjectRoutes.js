const router = require('express').Router()
const verify = require('../middlewares/verifyToken')
const {Object,ObjectType} = require("../database/seq")
const {objectValidation} = require("../middlewares/validation")

router.get('/',verify, async (req,res)=> {
    var options = {}
    if(req.query.includeObjectType == "true"){
        options = {include: ObjectType}
    }
    const objects = await Object.findAll(options)
    res.send(objects)
})

router.get('/:idObject',verify, async (req,res)=> {
    var options = {}
    if(req.query.includeObjectType == "true"){
        options = {include: ObjectType}
    }

    const object = await Object.findByPk(req.params.idObject,options)
    if(!object) return res.status(404).send({message: "There are not object with the id " + req.params.idObject})
    res.send(object)
})

router.post('/',verify, async (req,res)=> {
    //Validation
    const {error} = objectValidation(req.body)
    if(error) return res.status(422).send({message: error.details[0].message})

    //Chekc if already exist in the database
    const object = await Object.findByPk(req.body.id_object)
    if(object) return res.status(422).send({message: "Object already exist with id " + req.body.id_object})
    //Chekc if already exist in the database
    const objectType = await ObjectType.findByPk(req.body.ObjectTypeIdObjectType)
    if(!objectType) return res.status(422).send({message: "Does not exist Object Type with id " + req.body.ObjectTypeIdObjectType})
    
    try {
        delete req.body.id_object
        const objectSaved = await Object.create(req.body)
        return res.status(201).send({objectSaved: objectSaved })
    } catch (error) {
        res.status(400).send({message: error.errors[0].message})
    }
})

router.put('/',verify, async (req,res)=>{
    //Validation
    const {error} = objectValidation(req.body)
    if(error) return res.status(422).send({message: error.details[0].message})

    //Chekc if not exist in the database
    const object = await Object.findByPk(req.body.id_object)
    if(!object) return res.status(422).send({message: "Object do not exist with id " + req.body.id_object})
    

    Object.update(req.body,{where: {id_object:req.body.id_object} })
    .then( (result) => {
        res.send({objectUpdated: req.body})
    })
    .catch((err) => {
        if(err.errors) return res.status(404).send( {message: err.errors[0].message })
        res.status(404).send( {message: "Database constraint"})
    })
})

module.exports = router;