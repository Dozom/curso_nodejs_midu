// js -> por defecto utiliza CommonJs
// .mjs -> Para utilizar ES Modules
// .ejs -> Para utilizar CommonJS

import { sum, sub, mult } from './sum.mjs'
console.log('Suma')
console.log(sum(1,2))
console.log('Resta')
console.log(sub(1,2))
console.log('Multiplicación')
console.log(mult(1,2))
