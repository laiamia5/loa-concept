const {Sequelize} = require('sequelize')
require('dotenv').config()
const productos = require('./models/productos')
const usuarios = require('./models/usuarios')
const compras = require('./models/compras')
const reviews = require('./models/reviews')
const infos = require('./models/info')
const enviarOfertas = require('./models/enviarOfertas')

let usuarioDB = process.env.DB_USER
let contraseña = process.env.DB_PASSWORD
let host = process.env.DB_HOST

const database = new Sequelize(`postgres://${usuarioDB}:${contraseña}@${host}/loaconcept`,  {logging: false} )

productos(database)
usuarios(database)
compras(database)
reviews(database)
infos(database)
enviarOfertas(database)

const { producto } = database.models
const { usuario } = database.models
const { compra } = database.models
const { review, info, ofertas} = database.models

usuario.hasMany(compra,{
    foreignKey:'usuarioId'
  })
compra.belongsTo(usuario);


producto.hasMany(compra,{
  foreignKey:'productoId'
})
compra.belongsTo(producto);

review.hasMany(producto,{
  foreignKey:'reviewId'
})
producto.belongsTo(review);

module.exports = {database, producto, usuario, compra, review, info, ofertas} 