const {Router} = require('express')
const {info} = require('../db')

const rutaInfo = Router()

rutaInfo.get('/', async (req, res) => {
    try{
        let traer = await info.findAll()
        res.status(200).json(traer[0])
    }catch(err){
        res.status(400).send(err.message)
    }
})

rutaInfo.post('/', async (req, res) => {
    const {numero, direccion, email, facebook, avisos, instagram} = req.body
    try{
        let crear = await info.create({
            numero,
            facebook,
            email,
            avisos,
            direccion,
            instagram
        })
        res.status(200).send('creado exitosamente')
    }catch(err){
        res.status(400).send(err.message)
    }
})


rutaInfo.put('/', async (req, res) => {
    const {numero, direccion, email, facebook, instagram, avisos} = req.body
    try{
        let crear = await info.update({
            numero,
            facebook,
            email,
            direccion,
            instagram,
            avisos
        },  { where: { id: 1 } })
        res.status(200).send('actualizado exitosamente')
    }catch(err){
        res.status(400).send(err.message)
    }
})

module.exports = rutaInfo