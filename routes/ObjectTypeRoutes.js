const router = require('express').Router()
const verify = require('../middlewares/verifyToken')
const {ObjectType} = require("../database/seq")
const {objectTypeValidation} = require("../middlewares/validation")
const {Multer} = require('../middlewares/multer')

router.get('/',verify, async (req,res)=> {
    const objectypes = await ObjectType.findAll()
    res.send(objectypes)
})

router.get('/:idObjectType',verify, async (req,res)=> {
    const objectype = await ObjectType.findByPk(req.params.idObjectType)
    if(!objectype) return res.status(404).send({message: "There are not object type with the id " + req.params.idObjectType})
    res.send(objectype)
})

router.post('/',Multer.single('picture'),verify, async (req,res)=> {
    if(!req.file) return res.status(422).send({message: "Invalid image"})

    req.body.object_image = req.file.filename
    //Validation
    const {error} = objectTypeValidation(req.body)
    if(error) return res.status(422).send({message: error.details[0].message})

    //Chekc if already exist in the database
    const objectype = await ObjectType.findByPk(req.body.id_object_type)
    if(objectype) return res.status(422).send({message: "Object type already exist with id " + req.body.id_object_type})
    
    try {
        delete req.body.id_object_type
        const objectTypeSaved = await ObjectType.create(req.body)
        return res.status(201).send({objectTypeSaved: objectTypeSaved })
    } catch (error) {
        res.status(400).send({message: error.errors[0].message})
    }
})

router.put('/',verify, async (req,res)=>{
    //Validation
    const {error} = objectTypeValidation(req.body)
    if(error) return res.status(422).send({message: error.details[0].message})

    //Chekc if not exist in the database
    const objectype = await ObjectType.findByPk(req.body.id_object_type)
    if(!objectype) return res.status(422).send({message: "Object type do not exist with id " + req.body.id_object_type})
    

    ObjectType.update(req.body,{where: {id_object_type:req.body.id_object_type} })
    .then( (result) => {
        res.send({objectTypeUpdated: req.body})
    })
    .catch((err) => {
        if(err.errors) return res.status(404).send( {message: err.errors[0].message })
        res.status(404).send( {message: "Database constraint"})
    })
})





module.exports = router;