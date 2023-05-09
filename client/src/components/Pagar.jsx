import React from "react";
import axios from 'axios'
import { useEffect, useState } from "react";
import {useSelector} from 'react-redux'
// import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
// initMercadoPago('TEST-035d8db4-f766-4f9c-a923-c8b1d60b7622')
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Pagar (){

    const [preferenceId, setPreferenceId] = useState(null)
    const [medioDePago, setMedioDePago] = useState(true) //true = efectivo o false = mercadopago
    const carritoCompleto = useSelector(state => state.carrito)

    useEffect(() => {
        if(carritoCompleto.length !== 0){
            axios.post(`http://localhost:3001/pagar`, carritoCompleto)
            .then((res) => setPreferenceId(res.data))
            .catch((err) => alert("Unexpected error"))
        }
        else showToastMessage()
    }, [])

    const handleMoney = () => {
       medioDePago == true ? alert('efectivo') : alert('mercado')
    }

    let repes = 0
    const showToastMessage = () => {
        repes++
        if(repes <= 1){
            toast.error('debe agregar productos al carrito para realizar la compra', {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }
    }

    return(
        <>
            <ToastContainer />
         {/* <!-- Page Header Start --> */}
            <div class="container-fluid bg-secondary mb-5">
                <div class="d-flex flex-column align-items-center justify-content-center" style={{minHeight: "300px"}}>
                    <h1 class="font-weight-semi-bold text-uppercase mb-3">Finalizar compra</h1>
                    <div class="d-inline-flex">
                        <p class="m-0"><a href="">Home</a></p>
                        <p class="m-0 px-2">-</p>
                        <p class="m-0">Finalizar compra</p>
                    </div>
                </div>
            </div>
            {/* <!-- Page Header End --> */}

            {/* <!-- Checkout Start --> */}
            <div class="container-fluid pt-5">
                <div class="row px-xl-5">
                    <div class="col-lg-8">
                        <div class="mb-4">
                            <h4 class="font-weight-semi-bold mb-4">Datos del cliente</h4>
                            <div class="row">
                                <div class="col-md-6 form-group">
                                    <label>Nombre</label>
                                    <input class="form-control" type="text" placeholder="Loa"/>
                                </div>
                                <div class="col-md-6 form-group">
                                    <label>Apellido</label>
                                    <input class="form-control" type="text" placeholder="Concept"/>
                                </div>
                                <div class="col-md-6 form-group">
                                    <label>DNI</label>
                                    <input class="form-control" type="text" placeholder="44123455"/>
                                </div>
                                <div class="col-md-6 form-group">
                                    <label>Email</label>
                                    <input class="form-control" type="text" placeholder="example@email.com"/>
                                </div>
                                <div class="col-md-6 form-group">
                                    <label>Teléfono</label>
                                    <input class="form-control" type="text" placeholder="+54 9 11 2121 4545"/>
                                </div>
                                <div class="col-md-6 form-group">
                                    <label>Provincia</label>
                                    <select class="custom-select">
                                        <option selected>Buenos Aires</option>
                                        <option>La Pampa</option>
                                        <option>Corrientes</option>
                                        <option>Santa Fe</option>
                                        <option>Tucuman</option>
                                    </select>
                                </div>
                                <div class="col-md-6 form-group">
                                    <label>Localidad</label>
                                    <input class="form-control" type="text" placeholder="tu localidad"/>
                                </div>
                                <div class="col-md-6 form-group">
                                    <label>Barrio</label>
                                    <input class="form-control" type="text" placeholder="tu barrio"/>
                                </div>
                                <div class="col-md-6 form-group">
                                    <label>Calle y Altura</label>
                                    <input class="form-control" type="text" placeholder="tu direccion"/>
                                </div>
                                {/* <div class="col-md-6 form-group">
                                    <label>Localidad</label>
                                    <input class="form-control" type="text" placeholder="New York"/>
                                </div> */}
                                
                                <div class="col-md-12 form-group">
                                    <div class="custom-control custom-checkbox">
                                        <input type="checkbox" class="custom-control-input" id="newaccount"/>
                                        <label class="custom-control-label" for="newaccount">Crear Cuenta</label>
                                    </div>
                                </div>
                                {/* <div class="col-md-12 form-group">
                                    <div class="custom-control custom-checkbox">
                                        <input type="checkbox" class="custom-control-input" id="shipto"/>
                                        <label class="custom-control-label" for="shipto"  data-toggle="collapse" data-target="#shipping-address">Ship to different address</label>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                        {/* <div class="collapse mb-4" id="shipping-address">
                            <h4 class="font-weight-semi-bold mb-4">Shipping Address</h4>
                            <div class="row">
                                <div class="col-md-6 form-group">
                                    <label>First Name</label>
                                    <input class="form-control" type="text" placeholder="John"/>
                                </div>
                                <div class="col-md-6 form-group">
                                    <label>Last Name</label>
                                    <input class="form-control" type="text" placeholder="Doe"/>
                                </div>
                                <div class="col-md-6 form-group">
                                    <label>E-mail</label>
                                    <input class="form-control" type="text" placeholder="example@email.com"/>
                                </div>
                                <div class="col-md-6 form-group">
                                    <label>Mobile No</label>
                                    <input class="form-control" type="text" placeholder="+123 456 789"/>
                                </div>
                                <div class="col-md-6 form-group">
                                    <label>Address Line 1</label>
                                    <input class="form-control" type="text" placeholder="123 Street"/>
                                </div>
                                <div class="col-md-6 form-group">
                                    <label>Address Line 2</label>
                                    <input class="form-control" type="text" placeholder="123 Street"/>
                                </div>
                                <div class="col-md-6 form-group">
                                    <label>Country</label>
                                    <select class="custom-select">
                                        <option selected>United States</option>
                                        <option>Afghanistan</option>
                                        <option>Albania</option>
                                        <option>Algeria</option>
                                    </select>
                                </div>
                                <div class="col-md-6 form-group">
                                    <label>City</label>
                                    <input class="form-control" type="text" placeholder="New York"/>
                                </div>
                                <div class="col-md-6 form-group">
                                    <label>State</label>
                                    <input class="form-control" type="text" placeholder="New York"/>
                                </div>
                                <div class="col-md-6 form-group">
                                    <label>ZIP Code</label>
                                    <input class="form-control" type="text" placeholder="123"/>
                                </div>
                            </div>
                        </div> */}
                    </div>
                    <div class="col-lg-4">
                        <div class="card border-secondary mb-5">
                            <div class="card-header bg-secondary border-0">
                                <h4 class="font-weight-semi-bold m-0">Pedido</h4>
                            </div>
                            <div class="card-body">
                                <h5 class="font-weight-medium mb-3">Productos</h5>
                                {carritoCompleto.map((e) => {
                                    return(
                                        <div class="d-flex justify-content-between">
                                            <p>{e.cantidad}</p>
                                            <p>{e.nombre}</p>
                                            <p>${e.precio}</p>
                                        </div>
                                    )
                                })}
                                <hr class="mt-0"/>
                                <div class="d-flex justify-content-between mb-3 pt-1">
                                    <h6 class="font-weight-medium">Subtotal</h6>
                                    <h6 class="font-weight-medium">${carritoCompleto.reduce((acc, item) => {
                                            return acc + item.precio * item.cantidad;
                                        }, 0)}</h6>
                                </div>
                                <div class="d-flex justify-content-between">
                                    <h6 class="font-weight-medium">Envío</h6>
                                    <h6 class="font-weight-medium">$1000  
                                    </h6>
                                </div>
                            </div>
                            <div class="card-footer border-secondary bg-transparent">
                                <div class="d-flex justify-content-between mt-2">
                                    <h5 class="font-weight-bold">Total</h5>
                                    <h5 class="font-weight-bold">${
                                    carritoCompleto.length === 0 ? 0 : carritoCompleto.reduce((acc, item) => {
                                            return acc + item.precio * item.cantidad;
                                        }, 0) + 1000}</h5>
                                </div>
                            </div>
                        </div>
                        <div class="card border-secondary mb-5">
                            <div class="card-header bg-secondary border-0">
                                <h4 class="font-weight-semi-bold m-0">Realizar Pago</h4>
                            </div>
                            <div class="card-body">
                                <div class="form-group">
                                    <div class="custom-control custom-radio">
                                        <input type="radio" class="custom-control-input" name="payment" id="paypal"  onClick={() => setMedioDePago(false)}/>
                                        <label class="custom-control-label" for="paypal">Mercado Pago</label>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="custom-control custom-radio">
                                        <input type="radio" class="custom-control-input" name="payment" id="directcheck" onClick={() => setMedioDePago(true)}/>
                                        <label class="custom-control-label" for="directcheck">Efectivo</label>
                                    </div>
                                </div>
                                {/* <div class="">
                                    <div class="custom-control custom-radio">
                                        <input type="radio" class="custom-control-input" name="payment" id="banktransfer"/>
                                        <label class="custom-control-label" for="banktransfer">Transferencia Bancaria</label>
                                    </div>
                                </div> */}
                            </div>
                            <div class="card-footer border-secondary bg-transparent" >
                                <a style={{textDecoration: 'none'}} href={medioDePago == true ? 'https://www.linkedin.com/in/laia-m%C3%ADa-perez-029531245/' : preferenceId}>
                                   {carritoCompleto.length !== 0 
                                   ? <button class="btn btn-lg btn-block btn-primary font-weight-bold my-3 py-3">Realizar Compra</button>
                                    : <button class="btn btn-lg btn-block btn-primary font-weight-bold my-3 py-3" disabled >Realizar Compra</button>} 
                                </a>
                            </div>
                            {/* {preferenceId !== null && <Wallet initialization={{ preferenceId: preferenceId }} /> } */}
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Checkout End --> */}
        </>
    )
} 