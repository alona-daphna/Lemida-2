const { getUsers, getUser, updateUser, deleteUser } = require('../controllers/userController')

const router = require('express').Router()

router.get('/:id', getUser)
router.get('/', getUsers)
router.patch('/:id', updateUser)
router.delete('/:id', deleteUser)

module.exports = router