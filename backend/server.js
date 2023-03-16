require('dotenv').config()
const express = require('express')

const port = process.env.PORT
const app = express()

app.get('/', (req, res) => {
    res.send('hi')
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})