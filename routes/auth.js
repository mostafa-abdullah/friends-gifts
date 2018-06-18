var express = require('express')
var router = express.Router()
var { register, login, logout } = require('../controllers/auth')

router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)

module.exports = router
