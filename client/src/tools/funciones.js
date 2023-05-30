import axios from 'axios'

let idDelProd = []//guardara todos los id de los pedidos para luego enviarlos a la compra

/*añadir los datos de compra
"entrega": "pendiente",
"pago": "pendiente",
"medio_de_pago": "mercado pago",
"monto_final": null,*/
export const realizarCompraBack = async (productos, usuario) => {//realizando pedidos
	await productos.forEach(async (ele) => {
		await axios.post('http://localhost:3001/realizar-pedido',{
			talle : ele.talle,
			color : ele.color,
			cantidad: ele.cantidad,
			productoId: ele.id
		})
		.then(async (res) => {
			idDelProd.push(res.data.id)
			idDelProd.length === productos.length && realizarCompraBack2(usuario)
			descontarStock(ele.id)//descuenta el stock del producto comprado
		})
		.catch((err) => console.log(err))
	})
}


export const realizarCompraBack2 = (usuario) => {
	console.log('paso poraca')
	//primero me fijo si el usuario ya esta registrado en la base de datos
	//si el usuario ya existe y la prop registrado es true usare ese usuario
	//si el usuario existe pero no esta registrado o el usuario no existe lo creare
	//a este punto ya tengo el id del usuario y el array de pedidos solo hacen falta los datos de la compra
	axios.get(`http://localhost:3001/usuarios/${usuario.dni}`)
	.then((res) => {
		if(res.data) finalizarLaCompraBack(res.data.id) 
		else{
			axios.post(`http://localhost:3001/usuarios/signup`, {
				apellido: usuario.apellido,
				direccion_barrio: usuario.direccion_barrio,
				direccion_calles: usuario.direccion_calles,
				direccion_localidad: usuario.direccion_localidad,
				direccion_provincia: usuario.direccion_provincia,
				dni: usuario.dni,
				email: usuario.email,
				nombre: usuario.nombre,
				telefono: usuario.telefono
			})
			.then((res) => {
				finalizarLaCompraBack(res.data.id) 
			})
			.catch((err) => console.log(err))
		}
	})
	.catch((err) => console.log(err))
}

export const finalizarLaCompraBack = async (idUsuario) => {
	await axios.post('http://localhost:3001/compras', {
		usuarioId : idUsuario,
		pedidos: idDelProd
		//proporcionar datos faltantes
	})
	//cambiar la respuesta del then 
	.then((res) =>{ 
		console.log(res.data) 
	})
	.catch((err) => console.log(err))
}

export const descontarStock = (id) => {
	axios.put(`http://localhost:3001/productos/descontar-stock/${id}`)
	.then((res) => console.log('stock descontado exitosamente'))
	.then((err) => console.log(err))
}

const montoFinal = async (carrito) => {//es un dato para pasarle a 'compras'
	let monto = 0
	await carrito.reduce((acc, item) => {
		monto = acc + item.precio * item.cantidad;
	}, 0)
	return monto
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