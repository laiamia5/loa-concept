const {Router} = require('express')
const mercadopago = require('mercadopago')
require('dotenv').config()
const { setearCompra } = require('./index')

const payRouter = Router()
let token = process.env.ACCES_TOKEN_MP

payRouter.post('/:idCompras', async (req, res) => {
    // const {nombre, precio, categoria, descripcion, marca, cantidad, colores, talles} = req.body
    let preferenceId;
    const {idCompras} = req.params

    mercadopago.configure({
        access_token: token
    })

    //declaro la preferencia
    let preference = {
        items: [],
        back_urls: {
			"success": `http://localhost:3001/pagar/succes/${idCompras}`,
			"failure": "http://localhost:3001/pagar/feedback",
			"pending": "http://localhost:3001/pagar/feedback"
		},
		auto_return: "approved",
    }

    //tengo que meter las props que faltan en algun lugar para dar mas info de producto
    await req.body.forEach((e) => {
        preference.items.push({
            title: e.nombre,
            description: e.descripcion ? e.descripcion : "sin descripcion",
            currency_id: "$",
            quantity: e.cantidad,
            unit_price: e.precio
        })
    })

    //creo la prefencia
    await mercadopago.preferences.create(preference)
    .then((r) =>  {
        console.log(r.body)
        preferenceId = r.body.id
        res.status(200).send(r.body.init_point)
    }) 
    .catch((err) => console.log(err))

})

payRouter.get('/feedback', function (req, res) {
	res.json({
		Payment: req.query.payment_id,
		Status: req.query.status,
		MerchantOrder: req.query.merchant_order_id
	});
});

payRouter.get('/succes', function (req, res) {
    const {idCompras} = req.params
    setearCompra(idCompras)

	res.json({
		Payment: req.query.payment_id,
		Status: req.query.status,
		MerchantOrder: req.query.merchant_order_id
	});
});


module.exports = payRouter