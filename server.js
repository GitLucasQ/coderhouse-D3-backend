const express = require('express')
const fs = require('fs')

class Contenedor {

    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
    }

    async getAll() {
        try {
            const listaProductos = JSON.parse(await fs.promises.readFile(this.nombreArchivo, 'utf-8'));
            return listaProductos;
        } catch (error) {
            console.error('Sucedió un error:', error);
        }
    }

    async getRandomProduct() {
        try {
            const listaProductos = JSON.parse(await fs.promises.readFile(this.nombreArchivo, 'utf-8'));
            const cantidadProductos = listaProductos.length;
            return listaProductos[Math.floor(Math.random() * (cantidadProductos - 0)) + 0];
        } catch (error) {

        }
    }
}

const app = express()
const PORT = 8080

const contenedor = new Contenedor('./productos.txt')


app.get('/productos', (req, res) => {
    contenedor.getAll().then(productos => {
        res.send({ productos })
    })
})

app.get('/productoRandom', (req, res) => {
    contenedor.getRandomProduct().then(producto => {
        res.send({ producto })
    })
})

const server = app.listen(PORT, () => {
    console.log(`Servidor a la escucha en el puerto ${PORT}`)
})
server.on('error', error => console.log(`error tipo: ${error}`))