import React, { useEffect } from "react";
import axios from "axios";

export default function CompraFinalizada({ide}){
    useEffect(() => {
        console.log(ide)
        // props.id !== '' ?
        // axios.get(`http://localhost:3001/usuarios/${props.id}`)
        // .then((res) => console.log(res.data))
        // : console.log('la peticion fallo')
    }, [])
    return(
        <div style={{display: 'flex'}} class="d-flex justify-content-center flex-wrap">
            <div class="col-lg-4 border-secondary" style={{ border: '1px solid #EDF1FF !important'}}>
                    <div class="card-header bg-secondary border-0" >
                        <h4 class="font-weight-semi-bold m-0">Datos para la transferencia</h4>
                    </div>
                    <div class="card-body border-secondary">
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
                        <div class="form-group">
                            <div class="custom-control custom-radio">
                                <p>LAIA MIA PEREZ LUPIA</p>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="custom-control custom-radio">
                                <p>utiliza estos datos para realizar el pago y luego envía el comprobante a nuestro whatsapp, lo puedes encontrar en el pie página</p>
                            </div>
                        </div>
                    </div>
            </div>

            <div class="col-lg-4">
                        <div class="card border-secondary mb-5">
                            <div class="card-header bg-secondary border-0">
                                <h4 class="font-weight-semi-bold m-0">Información de tu compra</h4>
                            </div>
                            <div class="card-body">
                                    <div class="d-flex justify-content-between">
                                        <strong>destinatario :</strong>
                                        <p>laia mia perez</p>
                                    </div>
                                    <div class="d-flex justify-content-between">
                                        <strong>domicilio :</strong>
                                        <p>cuba 1234 pialr</p>
                                    </div>
                                    <div class="d-flex justify-content-between">
                                        <strong>estado del envío :</strong>
                                        <p>pendiente</p>
                                    </div>
                                    <div class="d-flex justify-content-between">
                                        <strong>metodo de pago :</strong>
                                        <p>mercado pago</p>
                                    </div>
                                    <div class="d-flex justify-content-between">
                                        <strong>estado del pago :</strong>
                                        <p>realizado</p>
                                    </div>
                                
                            </div>
                        </div>
                        </div>

                        {/* <div class="col-lg-4">
                            <div class="card border-secondary mb-5">
                                <div class="card-header bg-secondary border-0">
                                    <h4 class="font-weight-semi-bold m-0">Productos comprados</h4>
                                </div>
                                <div class="card-body">
                                        <div class="d-flex justify-content-between">
                                            <p>1</p>
                                            <p>cuba 1234 pialr</p>
                                            <p>laia mia perez</p>
                                        </div>
                                        <div class="d-flex justify-content-between">
                                            <p>2</p>
                                            <p>cuba 1234 pialr</p>
                                            <p>cuba 1234 pialr</p>
                                        </div>
                                        <div class="d-flex justify-content-between">
                                            <p>1</p>
                                            <p>pendiente</p>
                                            <p>pendiente</p>
                                        </div>
                                        <div class="d-flex justify-content-between">
                                            <p>2</p>
                                            <p>mercado pago</p>
                                            <p>mercado pago</p>
                                        </div>
                                        <div class="d-flex justify-content-between">
                                            <p>1</p>
                                            <p>realizado</p>
                                            <p>realizado</p>
                                        </div>
                                </div> */}
                            {/* </div> */}
                        {/* </div> */}
        </div>
    )
}