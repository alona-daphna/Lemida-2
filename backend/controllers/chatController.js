const Chat = require('../models/chatModule')

// get details for a single chat including participants and chat history
const getChat = async (req, res) => {
    try {
        const chatId = req.params.id;
        // return an array of users without the password prop inside the chat object
        const chat = await Chat.findById(chatId).populate({
            path: 'members',
            select: '-password'
        });
        res.status(200).json(chat);
    } catch (error) {
        res.status(400).json({error: error})
    }
}

// get all chats for the authenticated user
const getUserChats = async (req, res) => {
    res.status(200).json({msg: "get user chats"})
    try {
        // get the logged in user id
        const userId = req.user.id;
        // find all chats where the members array contains the user id
        const chats = await Chat.find({ members: userId })
        return res.status(200).json(chats)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Failed to retrieve chats'})
    }
}

// create a new chat with the specified user ids
const createChat = async (req, res) => {
    const { name, members } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'Please provide a name for the chat'})
    }  
    if (!members || members.length < 1) {
        return res.status(400).json({error: 'Please provide at least 1 other chat participant'})
    }

    // add the user creating the chat to the members array
    members.push(req.user.id);

    try {
        const chatQuery = Chat.create({ name, members });
        // populate the members array excluding password prop
        const populatedChat = await chatQuery.populate({
            path: 'members',
            select: '-password'
        })
        return res.status(201).json(populatedChat);
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: 'Failed to create chat'})
    }
}

// update chat name, list of participants, list of admins
const updateChat = async (req, res) => {

}

// create a new message in the specified chat 
const createMessage = async (req, res) => {

}

// delete chat
const deleteChat = async (req, res) => {
    try {
        const chatId = req.params.id;
        const chat = await Chat.findOneAndDelete({_id: chatId})
        res.status(200).json(chat)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Failed to delete chat'})
    }
}

module.exports = {
    getChat,
    getUserChats,
    createChat,
    updateChat,
    createMessage,
    deleteChat
}