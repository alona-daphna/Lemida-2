const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    chats: [{
        type: Schema.Types.ObjectId,
        ref: 'Chat'
    }]
})

module.exports = mongoose.model('user', userSchema)