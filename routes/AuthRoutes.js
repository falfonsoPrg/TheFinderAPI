const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { User } = require("../database/seq")

const {registerValidation,loginValidation} = require('../middlewares/validation')

router.post('/register', async (req,res)=>{
    //Validation
    const {error} = registerValidation(req.body)
    if(error) return res.status(422).send({message: error.details[0].message})

    //Check if is already in the database
    const checkId = await User.findByPk(req.body.id_user)
    if(checkId !== null){
        return res.status(422).send({message: 'Id already exist in the database'})
    }
    
    //Hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const user = req.body
    user.password = hashedPassword
    try {
        //Save a user in the database
        delete user.id_user
        const savedUser = await User.create(user);
        res.status(201).send({savedUser: savedUser })
    } catch (error) {
        res.status(400).send({message: error.errors[0].message})
    }
})

//Login
router.post('/login', async (req,res)=>{
    //Validation
    const {error} = loginValidation(req.body)
    if(error) return res.status(422).send({message: error.details[0].message})

    //Check if the email exist
    const user = await User.findOne({ where: {email:req.body.email}})
    if(user === null ) return res.status(404).send({message: 'The email is not registered in the database'})
    //Check if password is correct
    const validPass = await bcrypt.compare(req.body.password,user.password)
    if(!validPass) return res.status(422).send({message:'Invalid password'})

    //Create and put a token
    const token = jwt.sign({id_user:user.id_user},process.env.JWTOKEN,{
        expiresIn: '1h'
    })
    res.header('auth-token',token).send({token:token})
})


module.exports = router;