const {Router} = require('express')
const {compra, producto, pedido, usuario} = require('../db')

const rutaCompras = Router()

// ================================OBTENER COMPRAS ==================================

rutaCompras.get('/', async (req, res) => {
    try{
        let todas_las_compras = await compra.findAll({
            include: [
               { model: pedido,
                through:{
                    attributes: []
                },
                include: {model: producto}},
                {model: usuario}
            ],
            })
        res.status(200).json(todas_las_compras)
    }catch(err){
        res.status(400).send(err.message)
    }
})

//============================ REALIZAR COMPRA ========================================

rutaCompras.post('/', async (req, res) => {
    const {entrega, pago, medio_de_pago, monto_final, pedidos, usuarioId} = req.body

    try{
       let realizar_compra = await compra.create({
        entrega,
        pago,
        medio_de_pago,
        monto_final       
       })
       await realizar_compra.addPedido(pedidos) 
       await realizar_compra.setUsuario(usuarioId)

       res.status(200).send(realizar_compra)
    }catch(err){
       res.status(400).send(err.message)
    }
})


//=============================== ACTUALIZAR COMPRA ===============================================

// rutaCompras.put('/actualizar/:id', async (req, res) => {

//     const { pago , entrega } = req.body
//     const { id } = req.params

//     try{
//         const cambiarInfo = await compra.update( { pago, entrega } , { where: { id: id } })
//        res.status(200).send(cambiarInfo)

//     }catch(err){
//        res.status(400).send(err.message)
//     }
// })


module.exports = rutaCompras