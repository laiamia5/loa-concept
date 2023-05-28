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
        talle: null,
        color: null,
        productoId: obj.id,
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

export const finalizarCompra = () => async (dispatch) => {
    return dispatch({type: FINALIZAR_Y_VACIAR, payload: 'hola'})
}