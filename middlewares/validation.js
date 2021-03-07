const Joi = require('@hapi/joi')

const registerValidation = (data) => {
    const schema = Joi.object({
        id_user: Joi.number().required(),
        first_name: Joi.string().min(2).required(),
        last_name: Joi.string().min(2).required(),
        identification: Joi.number().min(2).required(),
        cellphone: Joi.number().min(2).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
        UserRolIdRole: Joi.number()
    })
    return schema.validate(data)
}

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    })
    return schema.validate(data)
}

const objectTypeValidation = (data) => {
    const schema = Joi.object({
        id_object_type: Joi.number().required(),
        object_type: Joi.string().min(1).required(),
        object_image: Joi.string().min(1).required()
    })
    return schema.validate(data)
}

const objectValidation = (data) => {
    const schema = Joi.object({
        id_object: Joi.number().required(),
        object_name: Joi.string().min(1).required(),
        object_description: Joi.string().min(1).required(),
        ObjectTypeIdObjectType: Joi.number().required() 
    })
    return schema.validate(data)
}

const publicationValidation = (data) => {
    const schema = Joi.object({
        id_publication: Joi.number().required(),
        publication_title: Joi.string().min(1).required(),
        publication_content: Joi.string().min(1).required(),
        entry_date: Joi.date().required(),
        found_place: Joi.string().min(1).required(),
        ObjectIdObject: Joi.number().required() 
    })
    return schema.validate(data)
}

const registryValidation = (data) => {
    const schema = Joi.object({
        id_registry: Joi.number().required(),
        out_date: Joi.date().required(),
        UserIdUser: Joi.number().required(),
        PublicationIdPublication: Joi.number().required()
    })
    return schema.validate(data)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation
module.exports.objectTypeValidation = objectTypeValidation
module.exports.objectValidation = objectValidation
module.exports.publicationValidation = publicationValidation
module.exports.registryValidation = registryValidation