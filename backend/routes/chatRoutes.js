const {getChat, getChats, createChat, createMessage} = require('../controllers/chatController')

const router = require('express').Router()

router.get('/:id', getChat)
router.get('/', getChats)
router.post('/', createChat)
router.post('/:id/messages', createMessage)

module.exports = router