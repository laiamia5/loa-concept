import React, { useEffect , useState} from "react";
import axios from 'axios'

export default function Footer (){
    const [info, setInfo] = useState({})

    useEffect(() => {
        axios.get('http://localhost:3001/info')
        .then((res) => setInfo(res.data))
        .catch((err) => console.log(err))
    }, [])

    return(
        <>
            {/* <!-- Footer Start --> */}
            <div class="container-fluid bg-secondary text-dark mt-5 pt-5">
                <div class="row px-xl-5 pt-5">
                    <div class="col-lg-4 col-md-12 mb-5 pr-3 pr-xl-5">
                        <a href="" class="text-decoration-none">
                            <h1 class="mb-4 display-5 font-weight-semi-bold"><span class="text-primary font-weight-bold border border-white px-3 mr-1">Loa</span>Concept</h1>
                        </a>
                        <p>{info?.descripcion}</p>
                        <p class="mb-2"><i class="fab fa-instagram text-primary mr-3" style={{transform: 'scale(1.3)'}}></i>{info?.instagram}</p>
                        <p class="mb-2"><i class="fa fa-envelope text-primary mr-3"></i>{info?.email}</p>
                        <p class="mb-0"><i class="fa fa-phone-alt text-primary mr-3"></i>{info?.numero}</p>
                    </div>
                    <div class="col-lg-8 col-md-12">
                        <div class="row">
                            <div class="col-md-4 mb-5">
                                <h5 class="font-weight-bold text-dark mb-4">Recomendaciones</h5>
                                <div class="d-flex flex-column justify-content-start">
                                    <a class="text-dark mb-2" href="index.html"><i class="fa fa-angle-right mr-2"></i>Tops</a>
                                    <a class="text-dark mb-2" href="shop.html"><i class="fa fa-angle-right mr-2"></i>Lenceria</a>
                                    <a class="text-dark mb-2" href="detail.html"><i class="fa fa-angle-right mr-2"></i>Remerones</a>
                                    <a class="text-dark mb-2" href="cart.html"><i class="fa fa-angle-right mr-2"></i>Buzos</a>
                                    <a class="text-dark mb-2" href="checkout.html"><i class="fa fa-angle-right mr-2"></i>Jeans</a>
                                    {/* <a class="text-dark" href="contact.html"><i class="fa fa-angle-right mr-2"></i>Contact Us</a> */}
                                </div>
                            </div>
                            <div class="col-md-4 mb-5">
                                <h5 class="font-weight-bold text-dark mb-4">Links</h5>
                                <div class="d-flex flex-column justify-content-start">
                                    <a class="text-dark mb-2" ><i class="fa fa-angle-right mr-2"></i>Inicio</a>
                                    <a class="text-dark mb-2" href="shop.html"><i class="fa fa-angle-right mr-2"></i>Nuestra tienda</a>
                                    {/* <a class="text-dark mb-2" href="detail.html"><i class="fa fa-angle-right mr-2"></i>Shop Detail</a> */}
                                    <a class="text-dark mb-2" href="checkout.html"><i class="fa fa-angle-right mr-2"></i>Carrito</a>
                                    <a class="text-dark" href="contact.html"><i class="fa fa-angle-right mr-2"></i>Contacto</a>
                                    <a class="text-dark mb-2" href="cart.html"><i class="fa fa-angle-right mr-2"></i>medios de pago</a>

                                </div>
                            </div>
                            
                            <div class="col-md-4 mb-5">
                                <h5 class="font-weight-bold text-dark mb-4">Quiero obtener ofertas</h5>
                                <form action="">
                                    <div class="form-group">
                                        <input type="text" class="form-control border-0 py-4" placeholder="Nombre" required="required" />
                                    </div>
                                    <div class="form-group">
                                        <input type="email" class="form-control border-0 py-4" placeholder="Email"
                                            required="required" />
                                    </div>
                                    <div>
                                        <button class="btn btn-primary btn-block border-0 py-3" type="submit">Subscribirse</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row border-top border-light mx-xl-5 py-4">
                    <div class="col-md-6 px-xl-0">
                        <p class="mb-md-0 text-center text-md-left text-dark">
                            &copy; Desarrollado por <a class="text-dark font-weight-semi-bold" href="#">Inside Solution</a>
                        </p>
                    </div>
                    <div class="col-md-6 px-xl-0 text-center text-md-right">
                        <img class="img-fluid" src="img/payments.png" alt=""/>
                    </div>
                </div>
            </div>
            {/* <!-- Footer End --> */}
            {/* <!-- Back to Top --> */}
            <a href="#" class="btn btn-primary back-to-top"><i class="fa fa-angle-double-up"></i></a>
        </>
    )
}