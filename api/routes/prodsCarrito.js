const {Router} = require('express')
const {prodsCarrito} = require('../db')

const rutaProductosCarrito = Router()

rutaProductosCarrito.get('/' , async (req, res) => {
    let esperar = await prodsCarrito.findAll()
    res.send(esperar)
})

rutaProductosCarrito.post('/' , async (req, res) => {
    const {nombre, precio, categoria, descripcion, marca, stock, img, cantidad, color, talle} = req.body
    try{
        prodsCarrito.create({
            nombre, 
            precio, 
            categoria, 
            descripcion, 
            marca, 
            stock, 
            img, 
            cantidad, 
            color, 
            talle
        })
        res.status(200).send('se agrego al carrito exitosdamente')
    }catch(err){
        res.status(400).send(err.message)
    }
})

module.exports = rutaProductosCarrito