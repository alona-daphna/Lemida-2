const {loginUser, registerUser, logout} =  require('../controllers/authController')

const router = require('express').Router()

router.post('/login', loginUser)
router.post('/register', registerUser)
router.get('/logout', logout)

module.exports = router