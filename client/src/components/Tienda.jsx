import React from "react";
import '../styles/allStyles.css'
import '../styles/moreStyles.css'
import foto from '../img/product-3.jpg'
import { useEffect, useState } from "react";
import axios from 'axios'


export default function Tienda (){

    const [ productos , setProductos] = useState([])
    const [cantidad , setCantidad] = useState([])
    const [page, setPage] = useState(0)

    useEffect(() => {
        handleProducts(0);
        handlePaginas();
    }, [])

    const handleProducts = (pagina) => {
        if(pagina !== cantidad.length && Math.sign(pagina) == 1 || pagina == 0 ){ 

            setPage(pagina)
            axios.get(`http://localhost:3001/productos/paginado?page=${pagina}`)
            .then((res) => {
                setProductos(res.data)
            })
            .catch((err) => console.log(err))

        }else return alert('no hay mas paginas')
        
    }

    const handlePaginas = () => {
        axios.get(`http://localhost:3001/productos/paginado`)
        .then((res) => {
            setCantidad(res.data)
        })
        .catch((err) => console.log(err))
    }

    const handleSearch = () => {
        axios.get()
    }

    return(
        <>
          {/* <!-- Shop Product Start --> */}
            <div class="col-lg-9 col-md-12">
                <div class="row pb-3">
                    <div class="col-12 pb-1">
                        <div class="d-flex align-items-center justify-content-between mb-4">
                            <form action="">
                                <div class="input-group">
                                    <input type="text" class="form-control" placeholder="buscar productos"/>
                                    <div class="input-group-append">
                                        <span class="input-group-text bg-transparent text-primary">
                                            <i class="fa fa-search"></i>
                                        </span>
                                    </div>
                                </div>
                            </form>
                            <div class="dropdown ml-4">
                                <button class="btn border dropdown-toggle" type="button" id="triggerId" data-toggle="dropdown" aria-haspopup="true"
                                        aria-expanded="false">
                                            Sort by
                                        </button>
                                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="triggerId">
                                    <a class="dropdown-item" href="#">Latest</a>
                                    <a class="dropdown-item" href="#">Popularity</a>
                                    <a class="dropdown-item" href="#">Best Rating</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    {productos.map((e, index) => {
                        return(
                            <div class="col-lg-4 col-md-6 col-sm-12 pb-1" key={index}>
                                <div class="card product-item border-0 mb-4">
                                    <div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                                        <img class="img-fluid w-100" src={foto} alt=""/>
                                    </div>
                                    <div class="card-body border-left border-right text-center p-0 pt-4 pb-3">
                                        <h6 class="text-truncate mb-3">{e.nombre}</h6>
                                        <div class="d-flex justify-content-center">
                                            <h6>$123.00</h6><h6 class="text-muted ml-2"><del>$123.00</del></h6>
                                        </div>
                                    </div>
                                    <div class="card-footer d-flex justify-content-between bg-light border">
                                        <a href="" class="btn btn-sm text-dark p-0"><i class="fas fa-eye text-primary mr-1"></i>View Detail</a>
                                        <a href="" class="btn btn-sm text-dark p-0"><i class="fas fa-shopping-cart text-primary mr-1"></i>Add To Cart</a>
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
        {/* </div> */}
    {/* </div> */}
    {/* <!-- Shop End --> */}

    </>
    )
}