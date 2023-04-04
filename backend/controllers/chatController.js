const Chat = require('../models/chatModule')

// get details for a single chat including participants and chat history
const getChat = async (req, res) => {
    console.log('get chat')
    res.status(200).json({msg: "get chat"})
}

// get all chats for the authenticated user
const getChats = async (req, res) => {

}

// create a new chat with the specified user ids
// invitation code? admin?
const createChat = async (req, res) => {
    
}

// create a new messafe in the specified chat 
const createMessage = async (req, res) => {

}

module.exports = {
    getChat,
    getChats,
    createChat,
    createMessage
}