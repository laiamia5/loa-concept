const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('compra', {
        id:{
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        numero: {
            type: DataTypes.INTEGER,
            autoIncrement: true
          },
        entrega:{
            type: DataTypes.ENUM('pendiente', 'en camino', 'entregada'),
            defaultValue: "pendiente"
        },
        pago:{
            type: DataTypes.ENUM('pendiente', 'pagado'),
            defaultValue: "pendiente"
        },
        nombre:{
            type: DataTypes.STRING
        },
        apellido:{
            type: DataTypes.STRING
        },
        email:{
            type: DataTypes.TEXT,
        },
        dni: {
            type: DataTypes.INTEGER,
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
        direccion_barrio:  {
            type: DataTypes.TEXT
        },
        telefono: {
            type: DataTypes.STRING
        },
        registrado: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    })
}