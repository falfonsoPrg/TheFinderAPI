const router = require('express').Router()
const verify = require('../middlewares/verifyToken')
const {Publication,Object} = require("../database/seq")
const {publicationValidation} = require("../middlewares/validation")

router.get('/',verify, async (req,res)=> {
    var options = {}
    if(req.query.includeObject == "true"){
        options = {include: Object}
    }
    const publications = await Publication.findAll(options)
    res.send(publications)
})

router.get('/:idPublication',verify, async (req,res)=> {
    var options = {}
    if(req.query.includeObject == "true"){
        options = {include: Object}
    }

    const publication = await Publication.findByPk(req.params.idPublication,options)
    if(!publication) return res.status(404).send({message: "There are not publication with the id " + req.params.idPublication})
    res.send(publication)
})

router.post('/',verify, async (req,res)=> {
    //Validation
    const {error} = publicationValidation(req.body)
    if(error) return res.status(422).send({message: error.details[0].message})

    //Chekc if already exist in the database
    const publication = await Publication.findByPk(req.body.id_publication)
    if(publication) return res.status(422).send({message: "Publication already exist with id " + req.body.id_publication})
    
    //Chekc if not exist in the database
    const object = await Object.findByPk(req.body.ObjectIdObject)
    if(!object) return res.status(422).send({message: "There are not object with the id " + req.body.ObjectIdObject})
    

    try {
        delete req.body.id_publication
        const publicationSaved = await Publication.create(req.body)
        return res.status(201).send({publicationSaved: publicationSaved })
    } catch (error) {
        res.status(400).send({message: error.errors[0].message})
    }
})

router.put('/',verify, async (req,res)=>{
    //Validation
    const {error} = publicationValidation(req.body)
    if(error) return res.status(422).send({message: error.details[0].message})

    //Chekc if not exist in the database
    const publication = await Publication.findByPk(req.body.id_publication)
    if(!publication) return res.status(422).send({message: "Publication do not exist with id " + req.body.id_publication})
    
    //Chekc if not exist in the database
    const object = await Object.findByPk(req.body.ObjectIdObject)
    if(!object) return res.status(422).send({message: "There are not object with the id " + req.body.ObjectIdObject})
    

    Publication.update(req.body,{where: {id_publication:req.body.id_publication} })
    .then( (result) => {
        res.send({publicationUpdated: req.body})
    })
    .catch((err) => {
        if(err.errors) return res.status(404).send( {message: err.errors[0].message })
        res.status(404).send( {message: "Database constraint"})
    })
})

module.exports = router;