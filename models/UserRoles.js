const { DataTypes } = require('sequelize');

module.exports = (sequelize)  => {
    return sequelize.define("UserRol",{
        id_role: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        role_name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}

