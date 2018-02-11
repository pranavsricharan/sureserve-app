var express = require('express')
var controller = require('../controllers/account')
var router = new express.Router()

router.post('/login', controller.login)
router.post('/register', controller.register)

module.exports = router