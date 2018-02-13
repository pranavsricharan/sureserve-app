var express = require('express')
var controller = require('../controllers/dashboard')
var auth = require('../../core/auth')

var router = new express.Router()

router.get('/', auth.requireAuth, controller.index) // Show controller index if authorized else login

module.exports = router