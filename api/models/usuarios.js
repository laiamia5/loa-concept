const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('usuario', {
        id:{
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        nombre:{
            type: DataTypes.STRING
        },
        apellido:{
            type: DataTypes.STRING
        },
        email:{
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true
        },
        contraseña:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        dni: {
            type: DataTypes.INTEGER,
            // allowNull: false,
        },
        direccion_provincia : {
            type: DataTypes.TEXT
        },
        direccion_localidad : {
            type: DataTypes.TEXT
        },
        direccion_calles : {
            type: DataTypes.TEXT
        },
        telefono: {
            type: DataTypes.INTEGER
        }
    },{timestamps: false})
}