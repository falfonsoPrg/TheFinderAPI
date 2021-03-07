const { DataTypes } = require('sequelize');

module.exports = (sequelize, ObjectTypeModel)  => {
    return sequelize.define("Object",{
        id_object: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        object_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        object_description: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}

