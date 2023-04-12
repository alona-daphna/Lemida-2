const { getUsers, getUser, updateUser, deleteUser } = require('../controllers/userController')
const { requireAuth } = require('../middleware/requireAuth')

const router = require('express').Router()

router.get('/:id', getUser)
router.get('/', getUsers)
router.patch('/:id', updateUser)
router.delete('/:id', requireAuth, deleteUser)

module.exports = router