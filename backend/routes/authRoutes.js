const router = require('express').Router()

const {loginUser, registerUser} =  require('../controllers/authController')

// route for login -- POST method
router.post('/login', loginUser)

// route for register -- POST method
router.post('/register', registerUser)


module.exports = router