require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')

// routes
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')
const authRoutes = require('./routes/authRoutes')

// middleware
const { requireAuth } = require('./middleware/requireAuth')

const port = process.env.PORT
const app = express()
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to database')
});

// Enable CORS for all requests
app.use(cors());
app.use(express.json())
app.use(cookieParser())
app.use((req, res, next) => {
    console.log(req.method, req.path)
    next()
})

// routes
app.use('/api/users', userRoutes)
app.use('/api/chats', requireAuth, chatRoutes)
app.use('/api/auth', authRoutes)

app.get('/', (req, res) => {
    res.send('hi')
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})