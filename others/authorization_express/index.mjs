import express from 'express'
import dotenv from 'dotenv'
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

app.get('/', (req, res) => {
	res.send("Hello World");
})

app.listen(port,() => {
	console.log(`server listening on port: ${port}`);
})
