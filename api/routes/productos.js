const {Router} = require('express')
const {producto} = require('../db')
const {Op} = require('sequelize');
const {paginar} =  require('../controller/index')

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
    
        try{
            let productos = await producto.findAll()
            let result = await paginar(productos)
            
            if(page){
              return result[page] 
              ? res.status(200).json(result[page]) 
              : res.status(200).send('no existe la pagina que solicita')
            } else return res.status(200).json(result)

        }catch(err){
            res.status(400).send(err.message)
        }

})

// =========================================FILTRAR PRODUCTOS POR... CON PAGINADO=======================================

rutaProducto.get('/buscar', async (req, res) => {

    const {categoria} =  req.query
    const {nombre} = req.query
    const {page} = req.query

    try{
        if(categoria){
            let productos_por_categoria = await producto.findAll({where: {categoria: categoria}})
            let arrayPaginado = await paginar(productos_por_categoria)
            
            if(page){
                return  arrayPaginado[page] 
                ? res.status(200).json(arrayPaginado[page]) 
                : res.status(200).send('no existe la pagina que solicita')
              } else return res.status(200).json(arrayPaginado)

        }else if(nombre){
            let productos_por_busqueda_manual = await producto.findAll({where:{ nombre: {[Op.iLike]: `%${nombre}%`} }})
            let arrayPaginado = await paginar(productos_por_busqueda_manual)
            
            if(page){
                return  arrayPaginado[page] 
                ? res.status(200).json(arrayPaginado[page]) 
                : res.status(200).send('no existe la pagina que solicita')
              } else return res.status(200).json(arrayPaginado)
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