require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

// routes
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')
const authRoutes = require('./routes/authRoutes')

const port = process.env.PORT
const app = express()
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to database')
});

app.use(express.json())
app.use((req, res, next) => {
    console.log(req.method, req.path)
    next()
})

// routes
app.use('/api/users', userRoutes)
app.use('/api/chats', chatRoutes)
app.use('/api', authRoutes)

app.get('/', (req, res) => {
    res.send('hi')
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})