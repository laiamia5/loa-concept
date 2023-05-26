import axios from 'axios'
/* 
	{
		"nombre": "LA Q Sy7yytrtttt",
		"precio": 2000,
		"categoria": "LA QUESiiiiiiiiiiiiiiiiiiiiiiiiiiiiO",
		"descripcion": null,
		"marca": null,
		"img": null,
		"cantidad": null,
		"color": null,
		"talle": null
	}
    peticion para enviar el producto que nos pidieron
*/
let idDelProd = []

export const crearProdCarr = async (ArrayDeProds, datosCliente) => {
    await ArrayDeProds.forEach((e) => {
        axios.post('http://localhost:3001/productos-carrito', e)
        .then((res) => console.log(res.data.id))
        .catch((err) => console.log(err))
    })
	await console.log(idDelProd)
	realizarCompra(idDelProd, datosCliente)
}

const realizarCompra = async (productos, datosCliente) => {
	console.log(datosCliente)

    axios.post('http://localhost:3001/compras',{
		nombre: datosCliente.nombre,
		apellido : datosCliente.apellido,
		direccion_barrio: datosCliente.direccion_barrio,
		direccion_calles: datosCliente.direccion_calles,
		direccion_localidad: datosCliente.direccion_localidad,
		direccion_provincia : datosCliente.direccion_provincia,
		dni: datosCliente.dni,
		email: datosCliente.email,
		telefono: datosCliente.telefono,
		// pago: datosCliente.pago,
		productoId: idDelProd })
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err))
}

/* 
		"entrega": "pendiente",
		"pago": "pendiente",
		"nombre": null,
		"apellido": null,
		"email": null,
		"dni": null,
		"direccion_provincia": null,
		"direccion_localidad": null,
		"direccion_calles": null,
		"direccion_barrio": null,
		"telefono": null,
		"registrado": false,
		"prodsCarritos": [
*/