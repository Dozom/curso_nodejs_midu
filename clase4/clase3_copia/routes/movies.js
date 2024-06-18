import { Router } from 'express'
import { validateMovie, validatePartialMovie } from '../schemas/movies.js'
import { createRequire } from 'node:module'
import { randomUUID } from 'node:crypto'

const router = Router()
export const moviesRouter = router

const require = createRequire(import.meta.url)
export const readJSON = (path) => require(path)

const movies = readJSON('../movies.json')


// CORS
const ACCEPTED_ORIGINS = [
    'http://localhost:1234',
    'http://localhost:8080',
    'http://localhost:8081'
]

router.get('/', (req, res) => {
    console.log("emte")
    const origin = res.header('origin')
    // cuando la petición es del mismo origin, el navegador no envia la cabecera origin
    if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
        res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
    }
    const { genre } = req.query
    if (genre) {
        const filteredMovies = movies.filter(
            movie => movie.genre.some(g => g.toLowerCase() == genre.toLowerCase())
        )
        return res.json(filteredMovies)
    }
    res.json(movies)
})

router.patch('/:id', (req, res) => {
    const result = validatePartialMovie(req.body)

    if (!result.success) {
        return res.status(400).json({ message: result.error.message })
    }

    const { id } = req.params
    const movieIndex = movies.findIndex(movie => movie.id == id)

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

router.post('/', (req, res) => { // los verbos definen las operaciones, mismo recurso
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
    movies.push(newMovie)

    res.status(201).json(newMovie)
})

router.get('/:id', (req, res) => { // path-to-regexp, parametro de la url
    const { id } = req.params
    const movie = movies.find(movie => movie.id == id)
    if (movie) return res.json(movie)

    res.status(404).json({ message: 'Movie not found' })
})

