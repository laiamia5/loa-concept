import React from "react";
import axios from 'axios'
import { useEffect, useState } from "react";
import {useSelector} from 'react-redux'
// import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
// initMercadoPago('TEST-035d8db4-f766-4f9c-a923-c8b1d60b7622')
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Pagar (){

    const [divPagar, setDivPagar] = useState(false)
    const [preferenceId, setPreferenceId] = useState(null)
    const [medioDePago, setMedioDePago] = useState(false) //true = cbu o false = mercadopago
    const carritoCompleto = useSelector(state => state.carrito)
    const [userID, setUserId] = useState('')
    const [datos, setDatos] = useState({
        nombre : '',
        apellido: '',
        dni: 0,
        email: '',
        contraseña: '',
        telefono: '',
        direccion_calles: '',
        direccion_localidad: '' ,
        direccion_provincia: 'Buenos Aires',
        direccion_barrio:'',
        registrado: false
    })
    const [permiso, setPermiso] = useState(false)

    useEffect(() => {
        handleForm()
        if(carritoCompleto.length !== 0){
            axios.post(`http://localhost:3001/pagar`, carritoCompleto)
            .then((res) => setPreferenceId(res.data))
            .catch((err) => alert("Unexpected error"))
        }
        else showToastMessage()
    }, [])

    let repes = 0
    const showToastMessage = () => {
        repes++
        if(repes <= 1){
            toast.error('debe agregar productos al carrito para realizar la compra', {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }
    }

  
    const showToastMess2 = (status, mensaje) => {
        status == 'success'
        ? toast.success(mensaje, {
            position: toast.POSITION.TOP_RIGHT
        })
        : toast.error(mensaje, {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    const handleForm = (propi, value) => {
        let copiaDatos = datos
        delete copiaDatos.undefined
        copiaDatos[propi] =  value
        setDatos(copiaDatos)
        console.log(copiaDatos)
    }

    const handleErrorSubmit = () => {
        let inputs =  document.querySelectorAll('.form-control')
        inputs.forEach((e) => {
            handleForm(e.name, e.value)
        })

        let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
        if(datos.email.length == 0)  showToastMess2('err' , 'El campo "email" es obligatorio')
        else if(datos.nombre.length == 0)  showToastMess2('err' , 'El campo "nombre" es obligatorio')
        else if(datos.apellido.length == 0)  showToastMess2('err' , 'El campo "apellido" es obligatorio')
        else if(datos.dni == 0)  showToastMess2('err' , 'El campo "DNI" es obligatorio')
        else if(datos.telefono.length == 0)  showToastMess2('err' , 'El campo "teléfono" es obligatorio')
        else if(datos.direccion_provincia.length == 0)  showToastMess2('err' , 'El campo "Provincia" es obligatorio')
        else if(datos.direccion_localidad.length == 0)  showToastMess2('err' , 'El campo "localidad" es obligatorio')
        else if(datos.direccion_calles.length == 0)  showToastMess2('err' , 'El campo "calle y altura" es obligatorio')
        else if(!emailRegex.test(datos.email) && datos.email.length !== 0)  showToastMess2('err' , 'el formato de email no es válido')
        else if(datos.dni.length !== 8) showToastMess2('err' , 'el campo dni debe tener 8 caracteres')
        else {
            setPermiso(true)
            medioDePago === true && setDivPagar(true)
        }
        console.log(datos)
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
                                    <input class="form-control" type="text" placeholder="Loa" name='nombre' onChange={(e) => handleForm(e.target.name, e.target.value)} />
                                </div>
                                <div class="col-md-6 form-group">
                                    <label>Apellido</label>
                                    <input class="form-control" type="text" placeholder="Concept"  name='apellido' onChange={(e) => handleForm(e.target.name, e.target.value) }/>
                                </div>
                                <div class="col-md-6 form-group">
                                    <label>DNI</label>
                                    <input class="form-control" type="number" placeholder="44123455"  name='dni' onChange={(e) => handleForm(e.target.name, e.target.value) }/>
                                </div>
                                <div class="col-md-6 form-group">
                                    <label>Email</label>
                                    <input class="form-control" type="text" placeholder="example@email.com"  name='email' onChange={(e) => handleForm(e.target.name, e.target.value) }/>
                                </div>
                                <div class="col-md-6 form-group">
                                    <label>Teléfono</label>
                                    <input class="form-control" type="text" placeholder="+54 9 11 2121 4545"  name='telefono' onChange={(e) => handleForm(e.target.name, e.target.value)}/>
                                </div>
                                <div class="col-md-6 form-group">
                                    <label>Provincia</label>
                                    <select class="custom-select" name='direccion_provincia' onChange={(e) => handleForm(e.target.name, e.target.value) }>
                                        <option selected>Buenos Aires</option>
                                        <option>La Pampa</option>
                                        <option>Corrientes</option>
                                        <option>Santa Fe</option>
                                        <option>Tucuman</option>
                                    </select>
                                </div>
                                <div class="col-md-6 form-group">
                                    <label>Localidad</label>
                                    <input class="form-control" type="text" placeholder="tu localidad"  name='direccion_localidad' onChange={(e) => handleForm(e.target.name, e.target.value) }/>
                                </div>
                                <div class="col-md-6 form-group">
                                    <label>Barrio</label>
                                    <input class="form-control" type="text" placeholder="tu barrio"  name='direccion_barrio' onChange={(e) => handleForm(e.target.name, e.target.value) }/>
                                </div>
                                <div class="col-md-6 form-group">
                                    <label>Calle y Altura</label>
                                    <input class="form-control" type="text" placeholder="tu direccion"  name='direccion_calles' onChange={(e) => handleForm(e.target.name, e.target.value) }/>
                                </div>
                                
                             
                            </div>
                        </div>
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
                                    <h6 class="font-weight-medium">$1100  
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
                                        <label class="custom-control-label" for="directcheck">Transferencia bancaria</label>
                                    </div>
                                </div>
                            </div>

                            {/* -----div de pago dbancario */}
                            {divPagar == true &&
                                <div>
                                    <div class="card-header bg-secondary border-0">
                                        <h4 class="font-weight-semi-bold m-0">Datos para la transferencia</h4>
                                    </div>
                                    <div class="card-body">
                                        <div class="form-group">
                                            <div class="custom-control custom-radio">
                                                <p>cvu: 23434243234234</p>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="custom-control custom-radio">
                                                <p>alias: laiamiaperezlupia.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                            
                            {/* ---------------------- */}
                            <div class="card-footer border-secondary bg-transparent" >
                                {carritoCompleto.length !== 0 //el carrito tiene algo?
                                    ? medioDePago === false  //medio de pago false = mp true = cbu
                                        ?   <a style={{textDecoration: 'none'}} href={permiso === true && preferenceId}>
                                                <button class="btn btn-lg btn-block btn-primary font-weight-bold my-3 py-3" onClick={() => handleErrorSubmit()}>Realizar Compra</button>
                                            </a>
                                        : <button class="btn btn-lg btn-block btn-primary font-weight-bold my-3 py-3" onClick={async () => handleErrorSubmit() }>Realizar Compra</button>
                                    : <button class="btn btn-lg btn-block btn-primary font-weight-bold my-3 py-3" disabled >Realizar Compra</button>
                                } 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Checkout End --> */}
        </>
    )
} 