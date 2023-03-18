require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const port = process.env.PORT
const app = express()
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to database')
});

app.get('/', (req, res) => {
    res.send('hi')
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})