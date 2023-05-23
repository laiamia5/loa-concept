import axios from 'axios'
export const AGREGAR_AL_CARRITO = 'AGREGAR_AL_CARRITO';
export const AUMENTAR_CANTIDAD = 'AUMENTAR_CANTIDAD';
export const DISMINUIR_CANTIDAD = 'DISMIMUIR_CANTIDAD'
export const ELIMINAR_DEL_CARRITO = 'ELIMINAR_DEL_CARRITO'
export const FINALIZAR_Y_VACIAR = 'FINALIZAR_Y_VACIAR'

export const agregarAlCarrito = (obj) => async (dispatch) => {
    let newOb = {
        ...obj,
        cantidad: 1,
        usuarioId: null,
        productoId: obj.id,
        pago: null
    }
    return dispatch({type:AGREGAR_AL_CARRITO, payload: newOb})
}

export const aumentarCantidad = (id) => async (dispatch) => {
    return dispatch({type: AUMENTAR_CANTIDAD, payload: id})
}


export const disminuirCantidad = (id) => async (dispatch) => {
    return dispatch({type: DISMINUIR_CANTIDAD, payload: id})
}

export const eliminarDelCarrito = (id) => async (dispatch) => {
    return dispatch({type: ELIMINAR_DEL_CARRITO, payload: id})
}

// export const finalizarCompra = (idUsuario, carrito) => async (dispatch) => {
//     carrito.forEach((e) => {
//         axios.post('http://localhost:3001/compras', {
//             productoId: e.id,
//             cantidad: e.cantidad,
//             usuarioId: idUsuario
//         })
//     })
//     return dispatch({type: FINALIZAR_Y_VACIAR, payload: idUsuario})
// }