const { DataTypes } = require('sequelize');

module.exports = (sequelize)  => {
    return sequelize.define("User",{
        id_user: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        identification: {
            type: DataTypes.BIGINT,
            allowNull: false,
            unique: true
        },
        cellphone: {
            type: DataTypes.BIGINT,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    })
}

