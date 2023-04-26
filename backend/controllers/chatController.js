const User = require('../models/userModule')
const Chat = require('../models/chatModule')
const mongoose = require('mongoose')

// move to utils
const validateIds = async (ids, collection, object) => {
    // check that ids are valid mongoose object ids
    if (!ids.every(id => mongoose.Types.ObjectId.isValid(id))) {
        return { status: 400, error: `Invalid ${object} id(s)` };
      }

    // check that all ids exist in the specified collection
    const memberObjs = await collection.find({ _id: { $in: ids } }, '_id');
    if (memberObjs.length !== ids.length) {
      return { status: 400, error: `${object} id(s) do(es) not exist in collection` };
    }

    return {status: 200};
}

// get details for a single chat including participants and chat history
const getChat = async (req, res) => {
    try {
        const chatId = req.params.id;
        // return an array of users without the password prop inside the chat object
        const chat = await Chat.findById(chatId).populate({
            path: 'members',
            select: '-password'
        });

        const isAuthorized = chat.members.some(element => element._id == req.userId)
        if (!isAuthorized) return res.status(403).json({ error: 'User does not have access' })

        res.status(200).json(chat);
    } catch (error) {
        res.status(400).json({ error: error })
    }
}

// get all chats for the authenticated user
const getUserChats = async (req, res) => {
    try {
        // get the logged in user id
        const userId = req.userId;
        console.log("user ID:", userId)
        // find all chats where the members array contains the user id
        const chats = await Chat.find({ members: userId }).populate({
            path: 'members',
            select: '-password'
        })
        return res.status(200).json(chats)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: 'Failed to retrieve chats'})
    }
}

// create a new chat with the specified usernames
const createChat = async (req, res) => {
    let { name, members } = req.body;
    const user = await User.findById(req.userId)

    if (!name) {
        return res.status(400).json({ error: 'Please provide a name for the chat'})
    }  
    if (!members || !Array.isArray(members) || members.length < 1 || (members.includes(user.username) && members.length == 1)) {
        return res.status(400).json({error: 'Please provide at least 1 other chat participant'})
    }

    // add the user creating the chat to the members array
    members.push(user.username);

    // Removing duplicated members
    members = [...new Set(members)]

    // validate usernames
    const memberObjs = await User.find({ username: { $in: members } });
    if (memberObjs.length !== members.length) return res.status(400).json(
        { error: "Invalid username(s)" }
    )

    // convert usernames to ids
    const memberIds = memberObjs.map(member => member._id)
    console.log(memberIds)

    

    try {
        const chat = await Chat.create({ name, members: memberIds });
        const populatedChat = await Chat.findById(chat._id).populate({
            path: 'members',
            select: '-password'
        });
        return res.status(201).json(populatedChat);
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: 'Failed to create chat'})
    }
}

// update chat name, list of participants
const updateChat = async (req, res) => {
    let {name, members} = req.body
    const user = await User.findById(req.userId)

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Invalid chat ID.' });
    }

    if (!name) {
        return res.status(400).json({error: 'Please provide a new chat name'})
    }
    if (!members || !Array.isArray(members) || members.length < 1 || (members.includes(user.username) && members.length == 1)) {
        return res.status(400).json({error: 'Please provide at least 1 other chat participant'})
    }

    // add current logged in user to members array
    if (!members.includes(user.username)) members.push(user.username)

    // Removing duplicated members
    members = [...new Set(members)]
    console.log(members)

    // validate usernames
    const memberObjs = await User.find({ username: { $in: members } });
    if (memberObjs.length !== members.length) return res.status(400).json(
        { error: "Invalid username(s)" }
    )

    // convert usernames to ids
    const memberIds = memberObjs.map(member => member._id)
    console.log(memberIds)

    try {
        const chat = await Chat.findOneAndUpdate(
            {_id: req.params.id},
            {name, members: memberIds},
            {new: true}
        ).populate({
            path: 'members',
            select: '-password'
        })

        const isAuthorized = chat.members.some(element => element._id == req.userId)
        if (!isAuthorized) return res.status(403).json({ error: 'User does not have access' })

        if (!chat) return res.status(400).json({error: 'Chat not found'})
    
        return res.status(200).json(chat)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: 'Failed to update chat'})
    }
}

// create a new message in the specified chat 
const createMessage = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Invalid chat ID.' });
    }

    const { text } = req.body;
    const sender = req.userId;
    const newMessage = {
        sender,
        text,
        createdAt: new Date()
    };

    if (!text) return res.status(400).json({error: 'Please provide message content'})

    try {
        const chat = await Chat.findOneAndUpdate(
            {_id: req.params.id},
            {$push: {message_history: newMessage}},
            {new: true}
        ).populate({
            path: 'members',
            select: '-password'
        });

        const isAuthorized = chat.members.some(element => element._id == req.userId)
        if (!isAuthorized) return res.status(403).json({ error: 'User does not have access' })
        

        if (!chat) return res.status(400).json({error: 'Chat not found'})

        return res.status(201).json(chat)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: 'Failed to create message'})
    }
}

// delete chat
const deleteChat = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Invalid chat ID.' });
    }
    try {
        const chat  = await Chat.findOneAndUpdate(
            {_id: req.params.id}, 
            {$pull: {members: req.userId}},
            {new: true}).populate({
                path: 'members',
                select: '-password'
            })
        
        const isAuthorized = chat.members.some(element => element._id == req.userId)
        if (!isAuthorized) return res.status(403).json({ error: 'User does not have access' })
        
        if (chat.members.length === 0) {
            await Chat.findByIdAndDelete(req.userId)
            return res.status(200).json('Chat deleted successfully')
        }

        return res.status(200).json(chat)

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
