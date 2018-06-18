var authRoutes = require('./auth')
var friendsRoutes = require('./friends')
var giftsRoutes = require('./gifts')
var needsLogin = require('../middlewares/needsLogin')
var express = require('express')
var router = express.Router()

router.get('/health', (req, res) => {
  return res.send('Working')
})

router.use('/auth', authRoutes)

router.use(needsLogin)

router.use('/friends', friendsRoutes)
router.use('/gifts', giftsRoutes)

module.exports = router
