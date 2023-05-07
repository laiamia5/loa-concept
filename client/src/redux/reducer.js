import {
    AGREGAR_AL_CARRITO,
    AUMENTAR_CANTIDAD,
    DISMINUIR_CANTIDAD,
    ELIMINAR_DEL_CARRITO
} from './actions'

let storage = localStorage.getItem('carrito')

const initialState = {
    carrito: [] 
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case  AGREGAR_AL_CARRITO:
            console.log(state)
            let encontrarProd = state.carrito.find((e) => e.id === action.payload.id )
            if(!encontrarProd){
                return{
                    // ...state,
                    carrito:[...state.carrito, action.payload]
                }
            }else encontrarProd.cantidad ++
        case AUMENTAR_CANTIDAD:
            state.carrito.find((e) => e.id == action.payload).cantidad ++
            console.log(state)
            return{
                // ...state,
                carrito: state.carrito
            }
        case DISMINUIR_CANTIDAD:
            let productoCarr = state.carrito.find((e) => e.id == action.payload)
            productoCarr.cantidad !== 0 && productoCarr.cantidad --
            return{
                // ...state,
                carrito: productoCarr.cantidad === 0 ?  state.carrito.filter((e) => e.id !== action.payload) : state.carrito
            }
        case ELIMINAR_DEL_CARRITO:
            return{
                // ...state,
                carrito: state.carrito.filter((e) => e.id !== action.payload) 
            }
        default :
            return state
        }
}

export default reducer;