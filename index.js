// CommonJS
const sum = require('./sum')

console.log('Hola, mundo!')
console.info('Hola, mundo!')
console.error('Hola, mundo')

// en node js no se tiene window
console.log(globalThis) // es una variable global en toda nuestra aplicación
console.log('La suma de 2 + 1, es: '+sum(1, 2))

