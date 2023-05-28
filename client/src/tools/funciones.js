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

const montoFinal = async (carrito) => {
	let monto = 0
	await carrito.reduce((acc, item) => {
		monto = acc + item.precio * item.cantidad;
	}, 0)
	return monto
}

export const realizarCompraBack = async (productos, usuario, datosCompra) => {//realizando pedidos
	await productos.forEach(async (ele) => {
		await axios.post('http://localhost:3001/realizar-pedido',{
			talle : ele.talle,
			color : ele.color,
			cantidad: ele.cantidad,
			productoId: ele.id
		})
		.then((res) => {
			idDelProd.push(res.data.id)
			idDelProd.length === productos.length && realizarCompraBack2(usuario)
		})
		.catch((err) => console.log(err))
	})
}


export const realizarCompraBack2 = (usuario, datosCompra) => {
	let idUsuario;
	//primero me fijo si el usuario ya esta registrado en la base de datos
	//si el usuario ya existe y la prop registrado es true usare ese usuario
	//si el usuario existe pero no esta registrado o el usuario no existe lo creare
	//a este punto ya tengo el id del usuario y el array de pedidos solo hacen falta los datos de la compra
	axios.get(`http://localhost:3001/usuarios/${usuario.dni}`)
	.then((res) => {
		if(res.data) idUsuario = res.data.id
		else{
			axios.post(`http://localhost:3001/usuarios/signup`, usuario)
			.then((res) => idUsuario = res.data.id)
			.catch((err) => console.log(err))
		}
	})
	.catch((err) => console.log(err))
}

export const finalizarLaCompraBack = (idUsuario) => {
	axios.post('http://localhost:3001/compras', {
		usuarioId : idUsuario,
		pedidos: idDelProd
		//proporcionar datos faltantes
	})
	//cambiar la respuesta del then 
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