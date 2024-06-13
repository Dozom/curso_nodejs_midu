const fs = require('node:fs')
// Es para convertir a asyncrono un metodo sincrono
const { promisify } = require('node:util')

// es un metodo sincrono
// const text = fs.readFileSync('../archivo.txt', 'utf-8')
// es un metodo asincrono
const readFilePromise = promisify(fs.readFile)

fs.readFile('../archivo.txt', 'utf-8', (err, text) => {
    console.log('Primer texto', text)    
})
console.log('Hace cosas mientras lee el archivo')
console.log('Leyendo el segundo archivo...')
fs.readFile('./archivo2.txt', 'utf-8', (err, text) => {
    console.log('Segundo texto',text)    
})


