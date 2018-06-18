var express = require('express')
var router = express.Router()
var { add, contribute, list } = require('../controllers/gifts')

router.post('/add', add)
router.put('/contribute', contribute)
router.get('/list', list)

module.exports = router
