const {Sequelize} = require('sequelize')
require('dotenv').config()
const productos = require('./models/productos')
const usuarios = require('./models/usuarios')

let usuarioDB = process.env.DB_USER
let contraseña = process.env.DB_PASSWORD
let host = process.env.DB_HOST

const database = new Sequelize(`postgres://${usuarioDB}:${contraseña}@${host}/loaconcept`,  {logging: false} )

productos(database)
usuarios(database)

const { producto } = database.models
const { usuario } = database.models

module.exports = {database, producto, usuario} 