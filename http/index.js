const http = require('node:http')

const server = http.createServer((req, res) => {
    console.log('request received')
    res.end('Hola Mundo')
})
// Busca el primer puerto que este disponible
server.listen(0, () => {
    console.log(`server listening on port 3000 ${server.address().port}`)
})

