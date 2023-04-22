const mongoose = require('mongoose')

const Schema = mongoose.Schema

const chatSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    members: [{
        memberId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }, pinned: {
            type: Boolean,
            required: true
        }
    }],
    message_history: [{
        text: {
            type: String,
            required: true
        },
        sender: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        createdAt: {
            type: Date,
            required: true
        }
    }]

}, {timestamps: true})

module.exports = mongoose.model('Chat', chatSchema)