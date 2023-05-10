import React, { useEffect, useState } from "react";
import '../styles/allStyles.css'
import '../styles/moreStyles.css'
import Servicios from '../components/Servicios'
import Categorias from "./Categorias";
import axios from 'axios'
import {Link} from 'react-router-dom'
import foto from '../img/product-3.jpg'
import { useDispatch } from "react-redux";
import { agregarAlCarrito } from "../redux/actions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Inicio (){
    
    let dispatch = useDispatch()
    const [cards, setCards] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3001/productos')
        .then((res) => {
            let copia = res.data.slice(0,12)
            setCards(copia)
        })
        .catch((err) => console.log(err))
    },[])

    const showToastMessage = (status, mensaje) => {
        status == 'success'
        ? toast.success(mensaje, {
            position: toast.POSITION.BOTTOM_RIGHT
        })
        : toast.error(mensaje, {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    }


    return(
        <>
            <Servicios/>
            <Categorias/>
            <ToastContainer />

            {/* ----------- */}
            <div class="container-fluid pt-5" >
                <div class="text-center mb-4">
                    <h2 class="section-title px-5"><span class="px-2">Trandy Products</span></h2>
                </div>
                <div class="row px-xl-5 pb-3" >
                {cards?.map((e, index) => {
                    return(
                        <div class="col-lg-3 col-md-6 col-sm-12 pb-1" key={index}>
                        <div class="card product-item border-0 mb-4">
                            <div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0 contenedor_imagen_tienda" >
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
                </div> 
            </div>
        </>
    )
}