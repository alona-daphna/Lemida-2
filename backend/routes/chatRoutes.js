const router = require('express').Router()
const {getChat} = require('../controllers/chatController')

// define all of our routes here
router.get('/:id', getChat)

module.exports = router