import React from "react";
import axios from 'axios'
import {useState} from 'react'

export default function Admin () {

    const [form, setForm] = useState({
        
            nombre: null,
            precio: null,
            categoria: null,
            descripcion: null,
            marca: null,
            stock: null,
            img: null,
            cantidad: null,
            colores: null,
            talles: null,
    })

    const handleForm = (propi, value) => {
        let copiaDatos = form
        delete copiaDatos.undefined
        copiaDatos[propi] =  value
        setForm(copiaDatos)
        console.log(copiaDatos)
    }


    return(
        <>
            <div class="text-center ">
                    <h2 class="section-title px-5"><span class="px-2">Subir producto</span></h2>
            </div>
            <div class="container-fluid pt-5">
                <div class="row px-xl-5">
                    <div class="col-lg-8">
                        <div class="mb-4">
                            <div class="row">
                                <div class="col-md-6 form-group">
                                    <label>Nombre</label>
                                    <input class="form-control" type="text" placeholder="nombre del producto" name='nombre'onChange={(e) => handleForm(e.target.name, e.target.value)}/>
                                </div>
                                <div class="col-md-6 form-group">
                                    <label>Precio</label>
                                    <input class="form-control" type="number" placeholder="precio"  name='apellido' />
                                </div>
                                <div class="col-md-6 form-group">
                                    <label>Marca</label>
                                    <input class="form-control" type="text" placeholder="marca"  name='dni' />
                                </div>
                                <div class="col-md-6 form-group">
                                    <label>Stock</label>
                                    <input class="form-control" type="number" placeholder="stock"  name='email' />
                                </div>
                                <div class="col-md-6 form-group">
                                    <label>Categorias</label>
                                    <select class="custom-select" name='direccion_provincia' >
                                        <option selected>Categorias</option>
                                        <option>Lenceria</option>
                                        <option>Tops</option>
                                        <option>Shorts</option>
                                        <option>Buzos</option>
                                        <option>Camperas</option>
                                        <option>Remeras</option>
                                        <option>Remerones</option>
                                    </select>
                                </div>
                                <div >
                                    <label>Colores</label>
                                    <br />
                                    <div class="col-md-2 form-group">
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="newaccount"/>
                                            <label class="custom-control-label" for="newaccount">Celeste</label>
                                        </div>
                                    </div>
                                    <div class="col-md-1 form-group">
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="newaccount"/>
                                            <label class="custom-control-label" for="newaccount">Blanco</label>
                                        </div>
                                    </div>
                                    <div class="col-md-1 form-group">
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="newaccount"/>
                                            <label class="custom-control-label" for="newaccount">Negro</label>
                                        </div>
                                    </div>
                                    <div class="col-md-1 form-group">
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="newaccount"/>
                                            <label class="custom-control-label" for="newaccount">Gris</label>
                                        </div>
                                    </div><div class="col-md-1 form-group">
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="newaccount"/>
                                            <label class="custom-control-label" for="newaccount">Rojo</label>
                                        </div>
                                    </div><div class="col-md-1 form-group">
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="newaccount"/>
                                            <label class="custom-control-label" for="newaccount">Rosa</label>
                                        </div>
                                    </div><div class="col-md-1 form-group">
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="newaccount"/>
                                            <label class="custom-control-label" for="newaccount">Azul</label>
                                        </div>
                                    </div>
                                </div>
                                <div >
                                    <label>Talles</label>
                                    <br />
                                    <div class="col-md-2 form-group">
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="newaccount"/>
                                            <label class="custom-control-label" for="newaccount">XS</label>
                                        </div>
                                    </div>
                                    <div class="col-md-1 form-group">
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="newaccount"/>
                                            <label class="custom-control-label" for="newaccount">S</label>
                                        </div>
                                    </div>
                                    <div class="col-md-1 form-group">
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="newaccount"/>
                                            <label class="custom-control-label" for="newaccount">M</label>
                                        </div>
                                    </div>
                                    <div class="col-md-1 form-group">
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="newaccount"/>
                                            <label class="custom-control-label" for="newaccount">L</label>
                                        </div>
                                    </div>
                                    <div class="col-md-1 form-group">
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="newaccount"/>
                                            <label class="custom-control-label" for="newaccount">XL</label>
                                        </div>
                                    </div>
                                </div>
                                <div class=" form-group">
                                    <label>Descripcion</label>
                                    <textarea class="form-control" type="text" placeholder="descripcion"  name='email' style={{height: '200px !important'}}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-11 pb-1" >
                                <div class="card product-item border-0 mb-4">
                                    <div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0 contenedor_imagen_tienda" style={{ height: '46vh !important', overflow: 'hidden !important'}}>
                                        {/* <img class="img-fluid w-100 " src= alt="/" /> */}
                                    </div>
                                    <div class="card-body border-left border-right text-center p-0 pt-4 pb-3">
                                        <h6 class="text-truncate mb-3">{form.nombre}</h6>
                                        <div class="d-flex justify-content-center">
                                            <h6>{form.precio}</h6><h6 class="text-muted ml-2"><del>$123.00</del></h6>
                                        </div>
                                    </div>
                                    <div class="card-footer d-flex justify-content-between bg-light border">
                                        <a class="btn btn-sm text-dark p-0"><i class="fas fa-eye text-primary mr-1"></i>ver producto</a>
                                        <a class="btn btn-sm text-dark p-0" >
                                           <i class="fas fa-shopping-cart text-primary mr-1"></i>agregar
                                        </a>
                                    </div>
                                </div>
                        </div>
                </div>
            </div>
        </>
    )
}