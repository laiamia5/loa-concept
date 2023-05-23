const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('prodsCarrito', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING
        },
        precio:{
            type: DataTypes.INTEGER
        },
        categoria:{
            type: DataTypes.STRING
        },
        descripcion:{
            type: DataTypes.TEXT //poner cada caracteristica y luego coma
        },
        marca: {
            type: DataTypes.STRING
        },
        img: {
            type: DataTypes.TEXT
        },
        cantidad: {
            type: DataTypes.INTEGER 
        },
        color: {
            type: DataTypes.TEXT 
        },
        talle:{
            type: DataTypes.TEXT 
        }

    },{timestamps: false})
}