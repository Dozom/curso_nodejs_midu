const z = require('zod')

const movieSchema = z.object({
    title: z.string({
        invalid_type_error: 'Movie title is required',
        required_error: 'Movie title is required.'
    }),
    year: z.number().int().positive().min(1900).max(2024),
    runtime: z.string(),
    genres: z.array(
        z.enum(['Comedy', 'Action']), {
        required_error: 'Movie genre is required.',
        invalid_type_error: 'Movie genre must be an array of enum Genre'
    }
    ),
    director: z.string(),
    actors: z.string(),
    plot: z.string(),
    posterUrl: z.string(),
})

function validatePartialMovie(input) { // Partial, todas opcionales
    return movieSchema.partial().safeParse(input)
}

function validateMovie(input) {
    return movieSchema.safeParse(input)
}

module.exports = {
    validateMovie,
    validatePartialMovie
}
