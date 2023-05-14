import React from "react";
import '../styles/allStyles.css'
import '../styles/moreStyles.css'
import foto from '../img/product-3.jpg'
import { useEffect, useState } from "react";
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { agregarAlCarrito } from "../redux/actions";
import '../styles/Tienda.css'
import { useLocation } from "react-router-dom";

export default function Tienda (props){

    const {search} = useLocation()
    const dispatch = useDispatch()
    //--------estados-----------
    const [ productos , setProductos] = useState([]) // => productos que se van a renderizar en el dom
    const [arrayInicial , setArrayInicial] = useState([]) // => array inicial que usare para poder configurar los filtros precio y talle
    const [cantidad , setCantidad] = useState([]) // => array entero con paginado y todo (lo uso para saber cuantas paginas hacer)
    const [page, setPage] = useState(0) // => numero de la pagina en la cual esta parado actualmente
    const [input, setInput] = useState('')

    useEffect(() => {
        
        if(search) handleFiltros()
        else handleProducts(0);

    }, [search])

    const handleProducts = (pagina) => {

        if(cantidad.length === 0){
            axios.get(`http://localhost:3001/productos/paginado`)
            .then((res) => {
                setCantidad(res.data)
                setPage(pagina)
                setProductos(res.data[pagina])
            })
            .catch((err) => console.log(err))
        }else{

            if(pagina !== cantidad.length && Math.sign(pagina) == 1 || pagina == 0 ){ 
                setPage(pagina)
                setProductos(cantidad[pagina])
            }else return  showToastMessage('error', 'no hay mas páginas')
        }  
    }

    const handleSearch = (value, pag) => {
        axios.get(`http://localhost:3001/productos/buscar?nombre=${value}`)
        .then((res) => {
            if(res.data.length === 0) return showToastMessage('error', 'no se hallaron productos')
            else{
                setCantidad(res.data)
                setProductos(res.data[pag])
                console.log(res.data)
            }
        })
        .catch((err) => console.log(err))
    }

    const showToastMessage = (status, mensaje) => {
        status == 'success'
        ? toast.success(mensaje, {
            position: toast.POSITION.TOP_RIGHT
        })
        : toast.error(mensaje, {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    const handleProductsForce = () => {
        axios.get(`http://localhost:3001/productos/paginado`)
        .then((res) => {
            setCantidad(res.data)
            setPage(0)
            setProductos(res.data[0])
        })
        .catch((err) => console.log(err))
    }

    const handleFiltros = () => {
        let parametro = search.split('=')
        if(parametro[0].includes('filtrar')){
            axios.get(`http://localhost:3001/productos/buscar?categoria=${parametro[1]}`)
            .then((res) => {
                setCantidad(res.data)
                setProductos(res.data[0])
            })
            .catch((err) => console.log(err) )
        }
        else {
            axios.get(`http://localhost:3001/productos/buscar?nombre=${parametro[1]}`)
            .then((res) => {
                setCantidad(res.data)
                setProductos(res.data[0])
            })
            .catch((err) => console.log(err) )
        }
    }

    // const handleCheckBox = () => {
    // }
        // let precio_0_2500 = 'precio_0_2500'
        // let precio_2500_5000 = 'precio_2500_5000'
        // let precio_5000_7500 = 'precio_5000_7500'
        // let precio_7500_10000 = 'precio_7500_10000'
        // let precio_10000_adelante = 'precio_10000_adelante'
        // let talle_XS = 'talle_XS'
        // let talle_S = 'talle_S'
        // let talle_M = 'talle_M'
        // let talle_L = 'talle_L'
        // let talle_XL = 'talle_XL'

    // useEffect(() => {
    //     cantidad && setArrayInicial(cantidad)
    //     for (const i in props.filtrar){
    //         if(props.filtrar[i] == true){
    //             switch(i){
    //                 case i == precio_0_2500 :

    //             }
    //         }
    //     }
    // }, [props.filtrar])

    return(
        <>
            <ToastContainer />
          {/* <!-- Shop Product Start --> */}
            <div class="col-lg-9 col-md-12">
                <div class="row pb-3">
                    <div class="col-12 pb-1">
                        <div class="d-flex align-items-center justify-content-between mb-4">
                            <form action="">
                                <div class="input-group">
                                    <input 
                                        type="text" 
                                        class="form-control" 
                                        placeholder="buscar productos" 
                                        onChange={(e) => setInput(e.target.value)}
                                    />
                                    <div class="input-group-append" onClick={() => handleSearch(input, 0)}>
                                        <span class="input-group-text bg-transparent text-primary">
                                            <i class="fa fa-search"></i>
                                        </span>
                                    </div>
                                    <button 
                                        style={{marginLeft: '10px'}}
                                        class="btn border " 
                                        type="button" 
                                        aria-expanded="false"
                                        onClick={() => {
                                            handleProductsForce()
                                        }}
                                        >
                                        Traer todos
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    { cantidad.length === 0 ? 
                    <div class="pagination justify-content-center mb-3 col-12 pb-1" style={{height: '200px'}}>
                        <div class="page-item" style={{marginTop:'10%'}}>no hay stock disponible</div>
                    </div> :
                    productos.map((e, index) => {
                        return(
                            <div class="col-lg-4 col-md-6 col-sm-12 pb-1" key={index}>
                                <div class="card product-item border-0 mb-4">
                                    <div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0 contenedor_imagen_tienda" style={{ height: '46vh !important', overflow: 'hidden !important'}}>
                                        <img class="img-fluid w-100 " src={e.img ? e.img : foto} alt="/" />
                                    </div>
                                    <div class="card-body border-left border-right text-center p-0 pt-4 pb-3">
                                        <h6 class="text-truncate mb-3">{e.nombre}</h6>
                                        <div class="d-flex justify-content-center">
                                            <h6>${e.precio}</h6><h6 class="text-muted ml-2"><del>$123.00</del></h6>
                                        </div>
                                    </div>
                                    <div class="card-footer d-flex justify-content-between bg-light border">
                                        <Link to={`/detalle/${e.id}`} style={{textDecoration: 'none'}}><a class="btn btn-sm text-dark p-0"><i class="fas fa-eye text-primary mr-1"></i>ver producto</a></Link>
                                        <a class="btn btn-sm text-dark p-0" 
                                            onClick={() => {
                                            showToastMessage('success', "producto agregado al carrito");
                                            dispatch(agregarAlCarrito(e))
                                            }}><i class="fas fa-shopping-cart text-primary mr-1"></i>agregar</a>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    <div class="col-12 pb-1">
                        <nav aria-label="Page navigation">
                          <ul class="pagination justify-content-center mb-3">
                            <li class="page-item disabled"  onClick={(e) => handleProducts(page - 1)}>
                              <a class="page-link" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                                <span class="sr-only">Previous</span>
                              </a>
                            </li>
                           { cantidad.map((e, index) => {
                            return (
                            <li 
                                key={index}
                                class={page == index ? "page-item active" : "page-item"} 
                                onClick={() => handleProducts(index)}>
                                    <a class="page-link">{index + 1}</a>
                            </li>)
                           })}
                            <li class="page-item" onClick={(e) => handleProducts(page + 1)}>
                              <a class="page-link" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                                <span class="sr-only">Next</span>
                              </a>
                            </li>
                          </ul>
                        </nav>
                    </div>
                </div>
            </div>
            {/* <!-- Shop Product End --> */}
        {/* <!-- Shop End --> */}

    </>
    )
}