// Importamos
const express = require('express');
const router = require('./router.js')
const app = express()

// Settings
//seteo puerto definido por servicio cloud, o establezco 8080 por defecto
app.set ('port', process.env.PORT || 8080)

// Middlewares
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// Ruta
app.use("/api/productos", router)

// Server
app.listen(8080, () => {
    console.log(`Escuchando en puerto ${app.get('port')}`);
})
