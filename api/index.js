const express = require('express')
const cors = require('cors')
const rutaProducto = require('./routes/productos')
const {database} = require('./db')

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

app.use('/productos', rutaProducto)



database
.sync({alter: true})
.then(() => {
    app.listen(3001, () => {
      console.log('se esta escuchando todo bien'); 
    });
});