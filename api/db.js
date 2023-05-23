const {Sequelize} = require('sequelize')
require('dotenv').config()
const productos = require('./models/productos')
const compras = require('./models/compras')
const infos = require('./models/info')
const enviarOfertas = require('./models/enviarOfertas')
const prods = require('./models/prodsCarrito')

let usuarioDB = process.env.DB_USER
let contraseña = process.env.DB_PASSWORD
let host = process.env.DB_HOST

const database = new Sequelize(`postgres://${usuarioDB}:${contraseña}@${host}/loaconcept`,  {logging: false} )

productos(database)
compras(database)
infos(database)
enviarOfertas(database)
prods(database)

const { producto } = database.models
const { info, ofertas, compra, prodsCarrito} = database.models


// prodsCarrito.hasMany(compra,{
//   foreignKey:'productoId'
// })
// compra.belongsTo(prodsCarrito);
compra.belongsToMany(prodsCarrito, {through: 'ProdsCarrID'});
prodsCarrito.belongsToMany(compra, {through: 'ProdsCarrID'});


module.exports = {database, producto,  compra, info, ofertas, prodsCarrito} 