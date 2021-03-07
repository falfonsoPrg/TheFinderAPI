const Sequelize = require("sequelize")

const UserRoleModel = require("../models/UserRoles")
const UserModel = require("../models/Users")
const ObjectTypeModel = require("../models/ObjectTypes")
const ObjectModel = require("../models/Objects")
const PublicationModel = require("../models/Publications")
const RegistryModel = require("../models/Registry")

//Conection with database
const sequelize = new Sequelize({
    dialect: "mysql",
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

sequelize.options.logging = false //Set loggin output to false

//Create the models
const UserRole = UserRoleModel(sequelize);
const User =  UserModel(sequelize,UserRole)
const ObjectType =  ObjectTypeModel(sequelize)
const Object = ObjectModel(sequelize,ObjectType)
const Publication = PublicationModel(sequelize,Object)
const Registry = RegistryModel(sequelize,User,Publication)

//Create the realtionships
UserRole.hasMany(User)
User.belongsTo(UserRole,{foreignKey: {defaultValue: 2}})

ObjectType.hasMany(Object)
Object.belongsTo(ObjectType)

Object.hasMany(Publication)
Publication.belongsTo(Object)

Publication.hasMany(Registry)
Registry.belongsTo(Publication)

User.hasMany(Registry)
Registry.belongsTo(User)

//Sync the database and chekc if the connection is Ok
sequelize.sync( { force:true } ).then( async () => {
    console.log("Conection DB OK")
    await UserRole.findOrCreate({
        where:{id_role:1},
        defaults: {id_role:1,role_name:"Admin"}
    })
    await UserRole.findOrCreate({
        where:{id_role:2},
        defaults: {id_role:2,role_name:"User"}
    })
    console.log("Roles created")
})

//Exports the models
module.exports = {
    UserRole,
    User,
    ObjectType,
    Object,
    Publication,
    Registry,
    sequelize
}