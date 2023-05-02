const {Sequelize} = require('sequelize')
require('dotenv').config()
const productos = require('./models/productos')
const usuarios = require('./models/usuarios')
const compras = require('./models/compras')

let usuarioDB = process.env.DB_USER
let contraseña = process.env.DB_PASSWORD
let host = process.env.DB_HOST

const database = new Sequelize(`postgres://${usuarioDB}:${contraseña}@${host}/loaconcept`,  {logging: false} )

productos(database)
usuarios(database)
compras(database)

const { producto } = database.models
const { usuario } = database.models
const { compra } = database.models

usuario.hasMany(compra,{
    foreignKey:'usuarioId'
  })
compra.belongsTo(usuario);


producto.hasMany(compra,{
  foreignKey:'productoId'
})
compra.belongsTo(producto);

module.exports = {database, producto, usuario, compra} 