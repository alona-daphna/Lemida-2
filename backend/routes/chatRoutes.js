const {getChat, getChats, createChat, createMessage, getUserChats} = require('../controllers/chatController')

const router = require('express').Router()

router.get('/:id', getChat)
router.get('/', getUserChats)
router.post('/', createChat)
router.post('/:id/messages', createMessage)

module.exports = router