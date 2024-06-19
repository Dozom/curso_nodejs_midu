import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User.mjs'

const authRoutes = express.Router()

authRoutes.post('/signup', async (req, res) => {
	try {
		const { username, password, role } = req.body;
		const user = new User({ username, password, role });
		await user.save();
		res.status(200).json({ message: "New user registered successfully" })
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: "Internal server errory" })
	}
})

authRoutes.post('/login', async (req, res) => {
	const { username, password, role } = req.body;
	try {
		const user = await User.findOne({ username })
		if (!user) {
			return res.status(401).json({ message: "Invalid username or password" });
		}
		if (user.password !== password) {
			return res.status(401).json({ message: "Invalid username or password" });
		}
		if (user.role !== role) {
			return res.status(401).json({ message: "Invalid role" });
		}
		// Generate JWT token
		const token = jwt.sign(
			{ id: user._id, username: user.username, role: user.role },
			process.env.JWT_SECRET
		)
		res.json({ token });
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: "Internal server error" });
	}

})

export default authRoutes
