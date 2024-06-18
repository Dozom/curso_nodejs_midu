import express, { json } from 'express' // commonJS
import { randomUUID } from 'node:crypto'
const app = express()
import movies, { filter, push, findIndex, find } from './movies.json'
import { validateMovie, validatePartialMovie } from './schemas/movies'

// endpoint -> path para extraer un recurso
app.disable('x-powered-by') // deshabilitar el header del x-powered-by
app.use(json())
app.get('/', (req, res) => {
    res.json({ message: 'hola mundo' })
})

const ACCEPTED_ORIGINS = [
    'http://localhost:8080',
    'http://localhost:8081'
]

app.get('/movies', (req, res) => {
    const origin = res.header('origin')
    // cuando la petición es del mismo origin, el navegador no envia la cabecera origin
    if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
        res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
    }
    const { genre } = req.query
    if (genre) {
        const filteredMovies = filter(
            movie => movie.genre.some(g => g.toLowerCase() == genre.toLowerCase())
        )
        return res.json(filteredMovies)
    }
    res.json(movies)
})

app.post('/movies', (req, res) => { // los verbos definen las operaciones, mismo recurso
    res.header('Access-Control-Allow-Origin', '*')
    console.log('El valor del body, es:')
    console.log(req.body)
    const result = validateMovie(req.body)

    if (result.error) {
        // 422, 
        return res.status(400).json({ error: result.error })
    }
    console.log("Error passed")
    const newMovie = {
        id: randomUUID(),
        ...result.data // X req.body
    }

    // Esto no sería REST, porque estamos guardando
    // el estado de la aplicación en memoria
    push(newMovie)

    res.status(201).json(newMovie)
})

// PATCH method
app.patch('/movies/:id', (req, res) => {
    const result = validatePartialMovie(req.body)

    if (!result.success) {
        return res.status(400).json({ message: result.error.message })
    }

    const { id } = req.params
    const movieIndex = findIndex(movie => movie.id == id)

    if (movieIndex == -1) {
        return res.status(404).json({ message: 'Movie not found' })
    }

    const updateMovie = {
        ...movies[movieIndex],
        ...result.data
    }

    movies[movieIndex] = updateMovie

    return res.json(updateMovie)
})

app.get('/movies/:id', (req, res) => { // path-to-regexp, parametro de la url
    const { id } = req.params
    const movie = find(movie => movie.id == id)
    if (movie) return res.json(movie)

    res.status(404).json({ message: 'Movie not found' })
})
const PORT = process.env.PORT ?? 1234
app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`)
})
