const router = require('express').Router()
const verify = require('../middlewares/verifyToken')
const { User , UserRole} = require("../database/seq")
const bcrypt = require('bcryptjs')

router.get("/",verify, async (req,res) => {
    var options = {}
    if(req.query.includeRole === "true"){
        options = {include: UserRole}
    }
    const users = await User.findAll(options)
    res.send(users)
})

router.get("/:idUser",verify, async (req,res) => {
    var options = {}
    if(req.query.includeRole === "true"){
        options = {include: UserRole}
    }
    const user = await User.findByPk( req.params.idUser ,options)
    if(!user) return res.status(404).send({message: "There are not a user with the id "+ req.params.idUser})

    res.send(user)
})

router.put("/edit",verify,async (req,res) => {
    //Not validated YET must have password and id

    const user = await User.findByPk(req.body.id_user)
    if(!user) return res.status(404).send({message: "There are not a user with the id "+ req.body.id_user})
    
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const userToUpdate = req.body
    userToUpdate.password = hashedPassword

    User.update(userToUpdate,{where: {id_user:req.body.id_user} })
    .then( (result) => {
        res.send({userUpdated:userToUpdate})
    })
    .catch((err) => {
        if(err.errors) return res.status(404).send( {message: err.errors[0].message })
        res.status(404).send( {message: "Database constraint"})
    })
})

module.exports = router;