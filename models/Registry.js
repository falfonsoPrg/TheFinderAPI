const { DataTypes } = require('sequelize');

module.exports = (sequelize, UserModel, PublicationModel)  => {
    return sequelize.define("Registry",{
        id_registry: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        out_date: {
            type: DataTypes.TIME,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
        // ,
        // id_in_user: {
        //     type: DataTypes.INTEGER,
        //     references:{
        //         model: UserModel,
        //         key: "id_user"
        //     }
        // },
        // id_out_user: {
        //     type: DataTypes.INTEGER,
        //     references:{
        //         model: UserModel,
        //         key: "id_user"
        //     }
        // },
        // id_publication: {
        //     type: DataTypes.INTEGER,
        //     references:{
        //         model: PublicationModel,
        //         key: "id_publication"
        //     }
        // }
    })
}

