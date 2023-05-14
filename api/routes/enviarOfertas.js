const {Router} = require('express')
const {ofertas } = require('../db')

const rutaEnvioOfertas = Router()

rutaEnvioOfertas.post('/', (req, res) => {
    const {nombre, email} = req.body
    try{
        ofertas.create({
            nombre,
            email
        })
        res.status(200).send('se subscrito de forma exitosa')
    }catch(err){
        res.status(400).send(err)
    }
})

rutaEnvioOfertas.get('/',async (req, res) => {
    try{
        let subscirtos = await ofertas.findAll()
        res.status(200).send(subscirtos)
    }catch(err){
        res.status(400).send(err)
    }
})

module.exports = rutaEnvioOfertas