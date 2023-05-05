const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('review', {
        id:{
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        estrellas: {
            type : DataTypes.INTEGER,
        },
        comentario: {
            type: DataTypes.TEXT
        },
        usuario: {
            type: DataTypes.STRING
        }
    })
}