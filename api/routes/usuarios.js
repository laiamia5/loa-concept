const {Router} = require('express')
const {usuario , compra} = require('../db')
const {Op} = require('sequelize')

const rutaUsuario = Router()

// ======================================OBTENER TODOS LOS USUARIOS================================

rutaUsuario.get('/', async (req, res) => {
    try{
        let todos_los_usuarios = await usuario.findAll({include: {model: compra}})
        res.status(200).json(todos_los_usuarios)
    }catch(err){
        res.status(400).send(err.message)
    }
})

// ========================================CREAR USUARIO================================

rutaUsuario.post('/', async (req, res) => {
    const {nombre, apellido, dni, email, contraseña, direccion_provincia, direccion_localidad, direccion_barrio, registrado, direccion_calles, telefono} = req.body
    try{
        let crear_usuario = await usuario.create({
            nombre,
            apellido,
            dni, 
            email,
            contraseña,
            telefono,
            direccion_calles,
            direccion_localidad,
            direccion_provincia,
            direccion_barrio,
            registrado
            })
        res.status(200).json(crear_usuario)
    }catch(err){
        res.status(400).send(err.message)
    }
})

// ========================================BUSCAR USUARIO POR QUERY================================

//eliminar los que se repitan en el array
rutaUsuario.get('/buscar', async (req, res) => {

    const {persona} = req.query
    console.log(req.query)
    try{
        let usuario_por_nombre = await usuario.findAll({where: {nombre: {[Op.iLike]: `%${persona}%`} }})
        let usuario_por_apellido = await  usuario.findAll({where: {apellido: {[Op.iLike]: `%${persona}%`} }})
        let todos_los_usuarios = [...usuario_por_apellido, ...usuario_por_nombre]
        usuario_por_nombre.length === 0 ? res.status(200).send('no se encontraron usuarios') : res.status(200).json(todos_los_usuarios)
    }catch(err){
        res.status(400).send(err.message)
    }

})

//======================================OBTENER USUARIO POR ID ===================================

rutaUsuario.get('/:id', async (req, res) => {

    const {id} = req.params
    let usuario_encontrado = await usuario.findOne({ where: {id}})

    try{
        res.status(200).send(usuario_encontrado)
    }catch(err){
        if(!usuario_encontrado) return res.status(400).send('el usuario no existe')
        else return res.status(400).send(err.message)
    }
})


//====================================ACTUALIZAR PERFIL DEL USUARIO===================================

rutaUsuario.put('/actualizar/:id', async (req, res) => {
    const {id} = req.params
    const  { nombre, apellido, email, dni, direccion_provincia, direccion_localidad, telefono, direccion_barrio, direccion_calles, registrado}  = req.body
    try{
        const cambiarUsuario = await usuario.update( { nombre, apellido, email, dni, direccion_provincia, direccion_localidad, telefono, direccion_barrio, direccion_calles, registrado}  , { where: { id: id } })
        res.status(200).json(cambiarUsuario)
    }catch(err){
        res.status(400).send(err.message)
    }
})

// =======================================ELIMINAR USUARIO===================================

rutaUsuario.delete('/eliminar/:id', async (req, res) => {
    const {id} = req.params
    try{
        usuario.destroy({
            where:{
                id: id
            }
        })
        res.status(200).send('usuario eliminado exitosamente')
    }catch(err){
        res.status(400).send(err.message)
    }
})

module.exports = rutaUsuario

