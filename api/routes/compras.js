const {Router} = require('express')
const {compra, usuario, producto} = require('../db')

const rutaCompras = Router()

// ================================OBTENER COMPRAS ==================================

rutaCompras.get('/', async (req, res) => {
    try{
        let todas_las_compras = await compra.findAll({
            include: [
                { model: usuario },
                { model: producto }
            ]})
        res.status(200).json(todas_las_compras)
    }catch(err){
        res.status(400).send(err.message)
    }
})

//============================ REALIZAR COMPRA ========================================

rutaCompras.post('/', async (req, res) => {
    const {usuarioId, productoId, cantidad, pago } = req.body

    try{
       let pedido = await compra.create({
        cantidad,
        pago        
       })
       pedido.setUsuario(usuarioId)
       pedido.setProducto(productoId)

       res.status(200).send('compra realizada de forma exitosa')
    }catch(err){
       res.status(400).send(err.message)
    }
})


//=============================== ACTUALIZAR COMPRA ===============================================

rutaCompras.put('/actualizar/:id', async (req, res) => {

    const { pago , entrega } = req.body
    const { id } = req.params

    try{
        const cambiarInfo = await compra.update( { pago, entrega } , { where: { id: id } })
       res.status(200).send(cambiarInfo)

    }catch(err){
       res.status(400).send(err.message)
    }
})


module.exports = rutaCompras