import axios from 'axios'

//pago (pendiente o realizado), medio de pago, monto final

export let procesarCompra = (productos, usuario) => {
	let idDelProd = [];
	let respuesta;
  
	const realizarCompraBack = (productos, usuario) => {
	  return new Promise((resolve, reject) => {
		const promises = productos.map(async (ele) => {
		  try {
			const res = await axios.post('http://localhost:3001/realizar-pedido', {
			  talle: ele.talle,
			  color: ele.color,
			  cantidad: ele.cantidad,
			  productoId: ele.id
			});
  
			idDelProd.push(res.data.id);
			descontarStock(ele.id);
		  } catch (err) {
			console.log(err);
		  }
		});
  
		Promise.all(promises)
		  .then(async () => {
			await realizarCompraBack2(usuario);
			resolve();
		  })
		  .catch((err) => {
			console.log(err);
			reject(err);
		  });
	  });
	};
  
	const realizarCompraBack2 = (usuario) => {
		//primero me fijo si el usuario ya esta registrado en la base de datos
		//si el usuario ya existe y la prop registrado es true usare ese usuario
		//si el usuario existe pero no esta registrado o el usuario no existe lo creare
		//a este punto ya tengo el id del usuario y el array de pedidos solo hacen falta los datos de la compra
	  return new Promise((resolve, reject) => {
		axios.get(`http://localhost:3001/usuarios/${usuario.dni}`)
		  .then(async (res) => {
			if (res.data) {
			  await finalizarLaCompraBack(res.data.id);
			} else {
			  await axios.post(`http://localhost:3001/usuarios/signup`, {
				apellido: usuario.apellido,
				direccion_barrio: usuario.direccion_barrio,
				direccion_calles: usuario.direccion_calles,
				direccion_localidad: usuario.direccion_localidad,
				direccion_provincia: usuario.direccion_provincia,
				dni: usuario.dni,
				email: usuario.email,
				nombre: usuario.nombre,
				telefono: usuario.telefono
			  });
  
			  const response = await axios.get(`http://localhost:3001/usuarios/${usuario.dni}`);
			  await finalizarLaCompraBack(response.data.id);
			}
  
			resolve();
		  })
		  .catch((err) => {
			console.log(err);
			reject(err);
		  });
	  });
	};
  
	const finalizarLaCompraBack = async (idUsuario) => {
		try {
		  const monto = await montoFinal(productos);
		  const res = await axios.post('http://localhost:3001/compras', {
			usuarioId: idUsuario,
			pedidos: idDelProd,
			monto_final: monto
			// Proporcionar datos faltantes
		  });
		  respuesta = res.data;
		  return res.data;
		} catch (err) {
		  console.log(err);
		  throw err;
		}
	  };
  
	return new Promise((resolve, reject) => {
	  realizarCompraBack(productos, usuario)
		.then(() => {
		  console.log(respuesta);
		  resolve(respuesta);//la funcion en su totalidad retornara esta respuesta
		})
		.catch((err) => {
		  console.log(err);
		  reject(err);
		});
	});
  };



	// ...................................................................................................
	const descontarStock = (id) => {
		axios.put(`http://localhost:3001/productos/descontar-stock/${id}`)
		.then((res) => 'nose')
		.then((err) => console.log(err))
	}

	const montoFinal = async (carrito) => {//es un dato para pasarle a 'compras'
		let monto = await obtenerElEnvio().then((res) => res)
		await carrito.reduce((acc, item) => {
			monto += acc + item.precio * item.cantidad;
		}, 0)
		return monto
	}

	export const obtenerElEnvio = async () => {
		try {
		  const response = await axios.get('http://localhost:3001/info');
		  return response.data.envio
		} catch (error) {
		  console.error(error);
		  throw error;
		}
	  };
