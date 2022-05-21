
// Importamos
const express = require('express');
const app = express()
const contenedor = require('./Contenedor')
const productos = new contenedor ('./productos.txt')

app.use(express.static('public'))






// Server
app.listen(8080, () => {
    console.log('Escuchando')
})