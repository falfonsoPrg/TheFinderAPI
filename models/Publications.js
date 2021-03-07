const { DataTypes } = require('sequelize');

module.exports = (sequelize, ObjectModel)  => {
    return sequelize.define("Publication",{
        id_publication: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        publication_title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        publication_content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        entry_date: {
            type: DataTypes.TIME,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        found_place: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}

