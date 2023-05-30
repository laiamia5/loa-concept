import axios from 'axios'

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
  
	const finalizarLaCompraBack = (idUsuario) => {
	  return new Promise((resolve, reject) => {
		axios.post('http://localhost:3001/compras', {
		  usuarioId: idUsuario,
		  pedidos: idDelProd
		  // Proporcionar datos faltantes
		})
		  .then((res) => {
			console.log(res.data);
			respuesta = res.data;
			resolve(res.data);
		  })
		  .catch((err) => {
			console.log(err);
			reject(err);
		  });
	  });
	};
  
	return new Promise((resolve, reject) => {
	  realizarCompraBack(productos, usuario)
		.then(() => {
		  console.log(respuesta);
		  resolve(respuesta);
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