const fs = require('node:fs')

// es un metodo sincrono
// const text = fs.readFileSync('../archivo.txt', 'utf-8')
// es un metodo asincrono
fs.readFile('../archivo.txt', 'utf-8', (err, text) => {
    console.log('Primer texto', text)    
})
console.log('Hace cosas mientras lee el archivo')
console.log('Leyendo el segundo archivo...')
fs.readFile('./archivo2.txt', 'utf-8', (err, text) => {
    console.log('Segundo texto',text)    
})


