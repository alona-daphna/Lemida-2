const {loginUser, registerUser} =  require('../controllers/authController')

const router = require('express').Router()

router.post('/login', loginUser)
router.post('/register', registerUser)

module.exports = router