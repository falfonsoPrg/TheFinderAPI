const { DataTypes } = require('sequelize');

module.exports = (sequelize)  => {
    return sequelize.define("ObjectType",{
        id_object_type: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        object_type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        object_image: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}

