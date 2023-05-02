const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('compra', {
        id:{
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        cantidad: {
            type : DataTypes.INTEGER,
        },
        entrega:{
            type: DataTypes.ENUM('pendiente', 'en camino', 'entregada'),
            defaultValue: "pendiente"
        },
        pago:{
            type: DataTypes.ENUM('pendiente', 'pagado'),
            defaultValue: "pendiente"
        },
        comprobante: {
            type: DataTypes.TEXT
        }
    })
}