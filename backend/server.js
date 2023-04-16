require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const http = require('http')
const socketio = require('socket.io')

// routes
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')
const authRoutes = require('./routes/authRoutes')

// middleware
const { requireAuth } = require('./middleware/requireAuth')

const port = process.env.PORT
const app = express()
const server = http.createServer(app)
const io = socketio(server, {
    // fix request blocked by CORS error
    cors: {
        origin: "http://localhost:3000"
    }
})
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to database')
});

// Enable CORS for all requests
app.use(cors({origin: 'http://localhost:3000', credentials: true}));
app.use(express.json())
app.use(cookieParser())
app.use((req, res, next) => {
    console.log(req.method, req.path)
    next()
})

// sockets
io.on('connection', (socket) => {
    socket.on('join-room', (room) => {
        socket.join(room)
    })
    socket.on('send-message', (data) => {
        const { room, message } = data
        // send message object to all chat members but sender
        socket.broadcast.to(room).emit('new-message', message)
    })
})

// routes
app.use('/api/users', userRoutes)
app.use('/api/chats', requireAuth, chatRoutes)
app.use('/api/auth', authRoutes)

server.listen(port, () => {
    console.log(`Listening on port ${port}`)
})