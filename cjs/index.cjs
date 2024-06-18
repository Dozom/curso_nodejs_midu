// js -> por defecto utiliza CommonJs
// .mjs -> Para utilizar ES Modules
// .ejs -> Para utilizar CommonJS
const { sum, sub, mult } = require('./sum.cjs')
console.log('Suma')
console.log(sum(1,2))
console.log('Resta')
console.log(sub(1,2))
console.log('Multiplicación')
console.log(mult(1,2))
