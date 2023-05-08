const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('info', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        direccion : {
            type : DataTypes.STRING,
        },
        instagram: {
            type : DataTypes.STRING,
        },
        facebook: {
            type : DataTypes.STRING,
        },
        numero:{
            type : DataTypes.STRING,
        },
        email:{
            type : DataTypes.STRING,
        },
        avisos:{
            type : DataTypes.TEXT,
        }
    },{timestamps: false})
}