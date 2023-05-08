const express = require('express')
const cors = require('cors')
const rutaProducto = require('./routes/productos')
const rutaUsuario = require('./routes/usuarios')
const rutaCompras = require('./routes/compras')
const rutaInfo = require('./routes/info')
const payRouter = require('./controller/mercadopago')
const {database} = require('./db')

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

app.use('/productos', rutaProducto)
app.use('/usuarios', rutaUsuario)
app.use('/compras', rutaCompras)
app.use('/info', rutaInfo )
app.use('/pagar', payRouter )

database
.sync({alter: true})
.then(() => {
    app.listen(3001, () => {
      console.log('se esta escuchando todo bien'); 
    });
});