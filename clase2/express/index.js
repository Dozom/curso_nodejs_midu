const ditto = require('../pokemon/ditto.json')
const express = require('express')
const app = express()

// desactivar el x-powered-by que pone que está hecho en express
app.disable('x-powered-by')
const PORT = process.env.PORT ?? 1234

// Middleware que trata peticiones post con content type application/json
// app.use(express.json()) -> es exactamente lo mismo que el codigo que hemos hecho de la 15 a la 26
app.use((req, res, next) => {
    if (req.method !== 'POST') return next()
    if (req.headers['content-type'] !== 'application/json') return next()
    let body = ''
    // escuchar el evento data
    req.on('data', chunk => {
        body += chunk.toString()
    })
    // Poner el next dentro del end, sino no va
    req.on('end', () => {
        const data = JSON.parse(body)
        req.body = data
        console.log('mi primer middleware')
        next()
    })
})

// Express muchas veces determina el content type segun lo que se devuelve
app.get('/', (req, res) => {
    res.status(200).send('<h1>Mi página web</h1>')
})

// Devolvemos pokemon ditto
app.get('/pokemon/ditto', (req, res) => {
    res.status(200).json(ditto)
})

app.post('/pokemon', (req, res) => {
    res.status(201).json(req.body)
})

// Hacer en orden, la última a la que va a llegar
app.use((req, res) => {
    res.status(404).send('<h1>Error 404</h1>')
})

app.listen(PORT, () => {
    console.log('server listening on port ', PORT)
})