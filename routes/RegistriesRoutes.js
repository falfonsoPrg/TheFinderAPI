const router = require('express').Router()
const verify = require('../middlewares/verifyToken')
const {Registry,User,Publication} = require("../database/seq")
const {registryValidation} = require("../middlewares/validation")


router.get('/',verify, async (req,res)=> {
    var options = {include: []}
    if(req.query.includePublication == "true"){
        options.include.push(Publication)
    }
    if(req.query.includeUser == "true"){
        options.include.push(User)
    }
    
    const registries = await Registry.findAll(options)
    res.send(registries)
})

router.get('/:idRegistry',verify, async (req,res)=> {
    var options = {include: []}
    if(req.query.includePublication == "true"){
        options.include.push(Publication)
    }
    if(req.query.includeUser == "true"){
        options.include.push(User)
    }
    const registry = await Registry.findByPk(req.params.idRegistry,options)
    if(!registry) return res.status(404).send({message: "There are not Registry with the id " + req.params.idRegistry})
    res.send(registry)
})

router.post('/',verify, async (req,res)=> {
    //Validation
    const {error} = registryValidation(req.body)
    if(error) return res.status(422).send({message: error.details[0].message})

    //Chekc if already exist in the database
    const registry = await Registry.findByPk(req.body.id_registry)
    if(registry) return res.status(422).send({message: "Registry already exist with id " + req.body.id_registry})
    //Chekc if not exist in the database
    const user = await User.findByPk(req.body.UserIdUser)
    if(!user) return res.status(422).send({message: "Does not exist User with id " + req.body.UserIdUser})
    //Chekc if not exist in the database
    const publication = await Publication.findByPk(req.body.PublicationIdPublication)
    if(!publication) return res.status(422).send({message: "Does not exist Publication with id " + req.body.PublicationIdPublication})

    try {
        delete req.body.id_registry
        const registrySaved = await Registry.create(req.body)
        return res.status(201).send({registrySaved: registrySaved })
    } catch (error) {
        res.status(400).send({message: error.errors[0].message})
    }
})

router.put('/',verify, async (req,res)=>{
    //Validation
    const {error} = registryValidation(req.body)
    if(error) return res.status(422).send({message: error.details[0].message})

    //Chekc if not exist in the database
    const registry = await Registry.findByPk(req.body.id_registry)
    if(!registry) return res.status(422).send({message: "Registry do not exist with id " + req.body.id_registry})
    //Chekc if not exist in the database
    const user = await User.findByPk(req.body.UserIdUser)
    if(!user) return res.status(422).send({message: "Does not exist User with id " + req.body.UserIdUser})
    //Chekc if not exist in the database
    const publication = await Publication.findByPk(req.body.PublicationIdPublication)
    if(!publication) return res.status(422).send({message: "Does not exist Publication with id " + req.body.PublicationIdPublication})

    Registry.update(req.body,{where: {id_registry:req.body.id_registry} })
    .then( (result) => {
        res.send({registryUpdated: req.body})
    })
    .catch((err) => {
        console.log(err)
        if(err.errors) return res.status(404).send( {message: err.errors[0].message })
        res.status(404).send( {message: "Database constraint"})
    })
})

module.exports = router;