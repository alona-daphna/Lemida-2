const Chat = require('../models/chatModule')

// get details for a single chat including participants and chat history
const getChat = async (req, res) => {
    console.log('get chat')
    res.status(200).json({msg: "get chat"})
}

// get all chats for the authenticated user
const getUserChats = async (req, res) => {

}

// create a new chat with the specified user ids
const createChat = async (req, res) => {
    
}

// update chat name, list of participants, list of admins
const updateChat = async (req, res) => {

}

// create a new message in the specified chat 
const createMessage = async (req, res) => {

}

// delete chat
const deleteChat = async (req, res) => {
    
}

module.exports = {
    getChat,
    getUserChats,
    createChat,
    updateChat,
    createMessage,
    deleteChat
}