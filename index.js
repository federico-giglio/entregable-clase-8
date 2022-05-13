
//importamos express
const express = require('express');
//importamos contenedor
const contenedor = require('./Contenedor')
//invocamos express()
const app = express()
//invocamos productos
const productos = new contenedor ('./productos.txt')

app.get('/', (req, res) => {
    res.send('<div><a href="/productos">Ver productos</a><br><a href="/productoRandom">Ver producto al azar</a></div>'
    )
})
//
app.get('/productos', async (req, res) => {
    const productitos = await productos.getAll()
    res.send(productitos);
})

app.get('/productoRandom', async (req, res) => {
    const productitoRandom = await productos.randomize()
    res.send(productitoRandom)
})

//método listen para escuchar puerto 8080
app.listen(8080, () => {
    console.log('server listening...');
})