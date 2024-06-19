import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.mjs'
import { verifyJWT } from './middlewares/verifyJWT.mjs'
import { mongoose } from 'mongoose'

const app = express()
const port = process.env.PORT ?? 3001

console.log(dotenv.config())
console.log(process.env.MONGODB_URL)
console.log(port)

app.use(express.json())

mongoose.connect(process.env.MONGODB_URL).then(() => {
	console.log("MongoDB is connected");
})

app.use('/auth', authRoutes);

app.get('/protected', verifyJWT, (req, res) => {
	const { username } = req.user
	res.json({ username: username })
})

app.get('/', (req, res) => {
	res.send("Hello World");
})

app.listen(port, () => {
	console.log(`server listening on port: ${port}`);
})
