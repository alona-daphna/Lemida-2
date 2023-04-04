const { getUsers, getUser } = require('../controllers/userController')

const router = require('express').Router()

router.get('/:id', getUser)
router.get('/', getUsers)

module.exports = router