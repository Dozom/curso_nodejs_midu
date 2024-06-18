import express, { json } from 'express' // commonJS
const app = express()
// import movies from './movies.json' assert { type: 'json' } // Experimental, ahora ya ha cambiado
// Como leer un JSON en ESmodules
// const movies = JSON.parse(fs.readFileSync('./movies.json')
// como leer un json en ESModules, forma recomendada
import { moviesRouter } from './routes/movies.js'

// endpoint -> path para extraer un recurso
app.disable('x-powered-by') // deshabilitar el header del x-powered-by
app.use(json())

app.use('/movies', moviesRouter)
console.log("enter")
const PORT = process.env.PORT ?? 1234
app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`)
})
