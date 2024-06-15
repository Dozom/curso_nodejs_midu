const http = require('node:http')
const fs = require('node:fs')
const desiredPort = process.env.PORT ?? 1234

/**
 * :OJO: Al hacer una SPA, redireccionar al index
 * Diferencia HEAD, GET ->
 * HEAD: Solo ver la cabecera de respuesta
 * GET: cabecera + body
 * OPTIONS: devuelve las cabeceras de CORS
 * POST: Crear recurso entero
 * PUT: Actualizar recursos
 * PATCH: Modificar parcialmente el recurso
 * http.cat, 
 * nodemon -> slower than node --watch, install it locally
 * 100 - 199: Respuestas informativas
 * 200 - 299: Respuestas satisfactorias
 * 300 - 399: Respuestas Redirecciones
 * 400 - 499: Errores del cliente
 * 500 - 599: Errores del servidor
 */

const dittoJson = require('./pokemon/ditto.json')

const processRquest = (req, res) => {
    const { method, url } = req

    switch (method) {
        case 'GET':
            switch (url) {
                case '/pokemon/ditto':
                    res.setHeader('Content-Type', 'application/json; carset=utf-8')
                    return res.end(JSON.stringify(dittoJson))
                default:
                    res.statusCode = 404
                    res.setHeader('Content-Type', 'text/html; charset=utf-8')
                    return res.end('<h1>404</h1>')
            }
        case 'POST':
            switch (url) {
                case '/pokemon/ditto':
                    res.setHeader('Content-Type', 'application/json; carset=utf-8')
                    return res.end(JSON.stringify(dittoJson))
                default:
                    res.statusCode = 404
                    res.setHeader('Content-Type', 'text/html; charset=utf-8')
                    return res.end('<h1>404</h1>')
            }
    }

    /*   
    MINI API con modulos nativos
    
    if (req.url === '/') {
            res.statusCode = 200 // 200
            res.setHeader('Content-Type', 'text/plain; charset=utf-8')
            res.end('Bienvenido a mi página de inicio')
        } else if (req.url === '/imagen-super-bonita.png') {
            fs.readFile('./200.jpg', (err, data) => {
                // en el data, se guarda un buffer
                if (err) {
                    res.statusCode = 500
                    res.end('<h1>500 Internal Server Error</h1>')
                } else {
                    // aqui se trata el buffer
                    res.setHeader('Content-Type', 'image/jpg')
                    res.end(data)
                }
            })
        }
        else if (res.url === '/contacto') {
            res.statusCode = 200 // OK
            res.end('<h1>Contacto</h1>')
        } else {
            res.statusCode = 404 // NOT FOUND
            res.end('<h1>NOT FOUND</h1>')
        }*/
}

const server = http.createServer(processRquest)

// Busca el primer puerto que este disponible
server.listen(desiredPort, () => {
    console.log(`server listening on port ${server.address().port}`)
})