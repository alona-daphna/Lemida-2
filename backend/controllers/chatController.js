// we need to import our model to access all sorts of functions to query and manipulate data from the database
const Chat = require('../models/chatModule')

// here we define all the functions for operations with the data
// remember that each function corresponds to a route in our /routes folder. It will be called when we visit that endpoint or when we send a request from the frontend.
const getChat = async (req, res) => {
    console.log('get chat')
    res.status(200).json({msg: "get chat"})
}

// at the end we export all of our functions so we can access them from outside this file
module.exports = {
    getChat
}