const {getChat, getChats, createChat, createMessage, getUserChats, updateChat, deleteChat} = require('../controllers/chatController')

const router = require('express').Router()

router.get('/:id', getChat)
router.get('/', getUserChats)
router.post('/', createChat)
router.patch('/:id', updateChat)
router.post('/:id/messages', createMessage)
router.delete('/:id', deleteChat)

module.exports = router