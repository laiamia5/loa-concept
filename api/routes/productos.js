const {Router} = require('express')
const {producto} = require('../db')
const {Op} = require('sequelize');

const rutaProducto = Router()

// ========================================== CREAR PRODUCTOS =====================================================

rutaProducto.post('/', async (req, res) => {
    const {nombre, precio, categoria, descripcion, marca, stock, img, cantidad} = req.body
    try{
        let newProducto = await producto.create({
            nombre,
            precio,
            categoria, 
            descripcion,
            marca,
            stock,
            img,
            cantidad
        })
        res.send(newProducto)
    }catch(err){
        if(!stock) return res.status(400).send('falta el dato "stock"')
        res.status(400).send(err)
    }
})


// ====================================== OBTENER TODOS LOS PRODUCTOS ============================================= 

rutaProducto.get('/', async (req, res) => {
    try{
        let todos_los_productos = await producto.findAll()
        res.status(200).send(todos_los_productos)
    }catch(err){
        res.status(400).send('sad!')
    }
})

// ========================================= PAGINADO ===========================================================

rutaProducto.get('/paginado', async (req, res) => {
    const {page} = req.query
    // try{
    //     let productos = await producto.findAll()
    //     let totalArr = []
    //     let newArr = []
    //     let vueltas = 0
    //     let recorrido = 0

    //     for(const i of productos){
    //         await newArr.push(i) 
    //         recorrido++
    //         if(vueltas === 8 || recorrido == productos.length - 1){
    //             await totalArr.push(newArr)
    //             newArr.length === 9 ? newArr = [] : newArr
    //             vueltas = 0
    //         }else{
    //             vueltas++
    //         }
    //     }
    //     res.status(200).json(totalArr)
    // }catch(err){
    //     res.status(400).send(err)
    // }
    
        try{
            let productos = await producto.findAll()
            let position = 0
            let result = []
                for (let i = 0; i < Math.ceil(productos.length / 9); i++) {
                    if (!i) result.push(productos.slice(0,9))
                    
                    else result.push(productos.slice(position, position + 9))
                    position += 9
                }
            
            if(page){
              return result[page] 
              ? res.status(200).json(result[page]) 
              : res.status(200).send('no existe la pagina que solicita')
            } else return res.status(200).json(result)

        }catch(err){
            res.status(400).send(err.message)
        }

})

// =========================================FILTRAR PRODUCTOS POR =======================================

rutaProducto.get('/buscar', async (req, res) => {

    const {categoria} =  req.query
    const {nombre} = req.query

    try{
        if(categoria){
            let productos_por_categoria = await producto.findAll({where: {categoria: categoria}})
            return res.status(200).send(productos_por_categoria)
        }else if(nombre){
            let productos_por_busqueda_manual = await producto.findAll({where:{ nombre: {[Op.iLike]: `%${nombre}%`} }})
            return res.status(200).send(productos_por_busqueda_manual)
        }else{
            return res.send('algunos de los datos no son correctos')
        }
    }catch(err){
        res.status(400).send(err)
    }
})

// ========================================== OBTENER UN PRODUCTO =====================================================

rutaProducto.get('/:id', async (req, res) => {
    const {id} = req.params
    try{
        let data = await producto.findOne({where: {id}})
        res.status(200).json(data)
    }
    catch(err){
        res.status(400).send(err)
    }
})

// ========================================== ELIMINAR UN PRODUCTO =====================================================

rutaProducto.delete('/:id', async (req, res) => {
    const {id} = req.params
    producto.destroy({
        where:{
            id: id
        }
    })
    try{
        res.status(200).send('borrado exitoso')
    }catch(err){
        res.status(400).send(err)
    }
})

// ========================================= BORRADO LOGICO ===========================================================


rutaProducto.put('/descontar-stock/:id', async (req, res) => {
    const {id} = req.params
    try{
        let data_producto = await producto.findOne({where: {id}})
        const  {nombre, precio, categoria, descripcion, marca, stock, img, cantidad} = data_producto

        let stock_actual = stock - 1

        const descontar = await producto.update({
            nombre, 
            precio, 
            categoria, 
            descripcion, 
            marca, 
            stock : stock_actual,
            img, 
            cantidad,
            display: stock_actual === 0 ? false : true
        } , { where: { id } })
        res.status(200).send('¡ stock actualizado !')
    }
    catch(err){
        res.status(400).send(err)
    }
})




module.exports = rutaProducto