const { readFile } = require('node:fs/promises')

// IIFE - Inmediatly Invoked Function Expression
;( 
    async () => {

        const text = await readFile('../archivo.txt', 'utf-8')
        console.log('Hace cosas mientras lee el archivo')
        console.log('Leyendo el segundo archivo...')
        console.log('Texto: ', text)

        const segundoTexto = await readFile('./archivo2.txt', 'utf-8')
        console.log('Segundo texto: ',segundoTexto)
    }
)()


