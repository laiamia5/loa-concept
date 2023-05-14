import React from "react";
import '../styles/allStyles.css'
import '../styles/moreStyles.css'
import { useLocation } from "react-router-dom";
import { useState } from "react";
import '../styles/Nav.css'
import { Link } from "react-router-dom";
import {useSelector} from 'react-redux'
import '../styles/responsive.css'

export default function Nav () {
let productos_length = useSelector(state => state.carrito.length)
let location = useLocation()
let [clase, setClase ] = useState('dropdown-menu rounded-0 m-0')
let [busqueda, setBusqueda] = useState('')
let [navResp, setNavResp] = useState(false)
let [menu, setMenu] = useState(false)

const cambiarClase = () => {
    if(clase === 'dropdown-menu rounded-0 m-0'){
        setClase('dropdown-menu rounded-0 m-0 ver')
    }else{
        setClase('dropdown-menu rounded-0 m-0')
    }
}

    return(
        <>
             {/* <!-- Topbar Start --> */}
            <div class="container-fluid">
                <div class="row bg-secondary py-2 px-xl-5">
                    <div class="col-lg-6 d-none d-lg-block">
                        <div class="d-inline-flex align-items-center">
                            <a class="text-dark" href="">FAQs</a>
                            <span class="text-muted px-2">|</span>
                            {/* <a class="text-dark" href="">ayuda</a> */}
                        </div>
                    </div>
                    <div class="col-lg-6 text-center text-lg-right">
                        <div class="d-inline-flex align-items-center">
                            <a class="text-dark px-2" href="">
                                <i class="fab fa-facebook-f"></i>
                            </a>
                            <a class="text-dark px-2" href="">
                                <i class="fab fa-instagram"></i>
                            </a>
                            <a class="text-dark pl-2" href="">
                            <svg style={{marginBottom: '5px'}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-whatsapp" viewBox="0 0 16 16"> <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/></svg>

                            </a>
                        </div>
                    </div>
                </div>
                <div class="row align-items-center py-3 px-xl-5" id='contenedor_search_carrito'>
                    <div class="col-lg-3 d-none d-lg-block">
                        <a href="" class="text-decoration-none">
                            <h1 class="m-0 display-5 font-weight-semi-bold"><span class="text-primary font-weight-bold border px-3 mr-1">Loa</span>Concept</h1>
                        </a>
                    </div>
                    <div class="col-lg-6 col-6 text-left">
                        <form action="">
                            <div class="input-group">
                                <input type="text" class="form-control" placeholder="Buscar Productos" onChange={(e) => setBusqueda(e.target.value)}/>
                                <div class="input-group-append">
                                    <span class="input-group-text bg-transparent text-primary">
                                    <Link to={ busqueda == '' ? '/' : `/tienda?buscar=${busqueda}`} style={{textDecoration: 'none'}}>
                                        <i class="fa fa-search"></i></Link>
                                    </span>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="col-lg-3 col-6 text-right">
                        {/* <a href="" class="btn border">
                            <i class="fas fa-heart text-primary"></i>
                            <span class="badge">0</span>
                        </a> */}
                        <Link to='/carrito' style={{textDecoration: 'none'}}><a  class="btn border">
                            <i class="fas fa-shopping-cart text-primary"></i>
                            <span class="badge">{productos_length}</span>
                        </a></Link>
                    </div>
                </div>
            </div>
            {/* <!-- Topbar End --> */}


            {/* <!-- Navbar Start --> */}
            {location.pathname !== "/administrador" && 
            <div class="container-fluid mb-5">
                <div class="row border-top px-xl-5" >
                    <div class="col-lg-3 d-none d-lg-block" 
                    onClick={() => menu === false ? setMenu(true) : setMenu(false) } 
                    >
                        <a class="btn shadow-none d-flex align-items-center justify-content-between bg-primary text-white w-100" data-toggle="collapse" style={{height: '55px', marginTop:' -1px', padding: '0 30px'}} > {/* style="height: 65px; margin-top: -1px; padding: 0 30px;" */}
                            <h6 class="m-0">Categorias</h6>
                            <i class="fa fa-angle-down text-dark"></i>
                        </a>
                        {location.pathname === "/" || menu == true ?
                        (<nav class="collapse show navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0" id="navbar-vertical">
                            <div class="navbar-nav w-100 overflow-hidden" > {/*style="height: 410px" */}
                                <div class="nav-item dropdown">
                                    <a href="#" class="nav-link" data-toggle="dropdown">Vestidos<i class="fa fa-angle-down float-right mt-1"></i></a>
                                    <div class="dropdown-menu position-absolute bg-secondary border-0 rounded-0 w-100 m-0">
                                        <a href="" class="dropdown-item">Men's Dresses</a>
                                        <a href="" class="dropdown-item">Women's Dresses</a>
                                        <a href="" class="dropdown-item">Baby's Dresses</a>
                                    </div>
                                </div>
                               <Link to='/tienda?filtrar=tops' style={{textDecoration: 'none'}}><a class="nav-item nav-link">Tops</a></Link> 
                               <Link to='/tienda?filtrar=lenceria' style={{textDecoration: 'none'}}><a class="nav-item nav-link">Lenceria</a></Link>
                               <Link to='/tienda?filtrar=polleras' style={{textDecoration: 'none'}}><a class="nav-item nav-link">Polleras</a></Link>
                               <Link to='/tienda?filtrar=zapatos' style={{textDecoration: 'none'}}><a class="nav-item nav-link">Zapatos</a></Link>
                                {/* <a href="" class="nav-item nav-link">Sportswear</a> */}
                                {/* <a href="" class="nav-item nav-link">Jumpsuits</a> */}
                                {/* <a href="" class="nav-item nav-link">Blazers</a> */}
                                {/* <a href="" class="nav-item nav-link">Jackets</a> */}
                                {/* <a href="" class="nav-item nav-link">Shoes</a> */}
                            </div>
                        </nav>)
                        : <div style={{height: '0', width: '0'}}></div>
                        }
                    </div>
                    <div class="col-lg-9">
                        <nav class="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
                            <a href="" class="text-decoration-none d-block d-lg-none">
                                <h1 class="m-0 display-5 font-weight-semi-bold"><span class="text-primary font-weight-bold border px-3 mr-1">Loa</span>Concept</h1>
                            </a>
                             {/* -----------responsive--------- */}
                                <Link to='/carrito' style={{textDecoration: 'none'}} className="disp">
                                    <a  class="btn border">
                                        <i class="fas fa-shopping-cart text-primary"></i>
                                        <span class="badge">{productos_length}</span>
                                    </a>
                                </Link>
                            {/* -------------------------------- */}
                            <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse" onClick={() => navResp == true ? setNavResp(false) : setNavResp(true)}>
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class={navResp == false ? "collapse navbar-collapse justify-content-between" : "collapse navbar-collapse justify-content-between display_block anim" } id="navbarCollapse">
                                <div class="navbar-nav mr-auto py-0">
                                  <Link to='/' style={{textDecoration: 'none'}}><a class={ location.pathname === "/" ? "nav-item nav-link active" : "nav-item nav-link"}>Inicio</a></Link>  
                                  <Link to='/tienda' style={{textDecoration: 'none'}}><a class={ location.pathname === "/tienda" ? "nav-item nav-link active" : "nav-item nav-link"}>Tienda</a></Link> 
                                    <div class="nav-item dropdown">
                                        <a data-toggle="dropdown" onClick={cambiarClase} class={ location.pathname === "/carrito" ? "active nav-link dropdown-toggle pages" : "nav-link dropdown-toggle pages"}>Compras</a>
                                        <div class= {clase} onClick={cambiarClase}>
                                            <Link to='/carrito' style={{textDecoration: 'none'}}><a class="dropdown-item">Carrito</a></Link>
                                            <Link to='/finalizar-compra' style={{textDecoration: 'none'}}><a class="dropdown-item">Finalizar Compra</a></Link>
                                        </div>
                                    </div>
                                    <Link to='/contacto' style={{textDecoration: 'none'}}>  <a class={ location.pathname === "/contacto" ? "nav-item nav-link active" : "nav-item nav-link"}>Contacto</a></Link>
                                </div>
                                <div class="navbar-nav ml-auto py-0">
                                    <a href="" class="nav-item nav-link">Iniciar sesión </a>
                                    <a href="" class="nav-item nav-link">Registrarse</a>
                                </div>
                            </div>
                        </nav>
                        {location.pathname === "/" && 
                        <div id="header-carousel" class="carousel slide" data-ride="carousel">
                            <div class="carousel-inner">
                                <div class="carousel-item active" > {/* style="height: 410px;"*/}
                                    <img class="img-fluid" src="img/carousel-1.jpg" alt="Image"/>
                                    <div class="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                        <div class="p-3" > {/*style="max-width: 700px;" */}
                                            <h4 class="text-light text-uppercase font-weight-medium mb-3">10% Off Your First Order</h4>
                                            <h3 class="display-4 text-white font-weight-semi-bold mb-4">Fashionable Dress</h3>
                                            <a href="" class="btn btn-light py-2 px-3">Shop Now</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="carousel-item"> {/* style="height: 410px;" */}
                                    <img class="img-fluid" src="img/carousel-2.jpg" alt="Image"/>
                                    <div class="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                        <div class="p-3" > {/*style="max-width: 700px;" */} 
                                            <h4 class="text-light text-uppercase font-weight-medium mb-3">10% Off Your First Order</h4>
                                            <h3 class="display-4 text-white font-weight-semi-bold mb-4">Reasonable Price</h3>
                                            <a href="" class="btn btn-light py-2 px-3">Shop Now</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <a class="carousel-control-prev" href="#header-carousel" data-slide="prev">
                               <div class="btn btn-dark">  {/*  style="width: 45px; height: 45px;" */}
                                    <span class="carousel-control-prev-icon mb-n2"></span>
                                </div>
                            </a>
                            <a class="carousel-control-next" href="#header-carousel" data-slide="next">
                                 <div class="btn btn-dark" > {/* style="width: 45px; height: 45px;" */}
                                    <span class="carousel-control-next-icon mb-n2"></span>
                                </div>
                            </a>
                        </div>
                        }
                    </div>
                </div>
            </div>
            }
            {/* <!-- Navbar End --> */}

        </>
    )
}
