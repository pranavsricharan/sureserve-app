var express = require('express')
var router = new express.Router();


router.use('/api', require('./api/routes'))

router.get('/', function(req, res) {
    res.render('base/index', {pageName: "home", title: 'Home'})
})

router.use('/dashboard', function(req, res) {
    res.render('dashboard/index', {pageName: "dashboard", title: 'Dashboard'})
})

router.use('/login', function(req, res) {
    res.render('account/login', {pageName: "login", title: 'Login'})
})

router.use('/register', function(req, res) {
    res.render('account/register', {pageName: "register", title: 'Register'})
})

router.use('/logout', function(req, res) {
    res.render('base/skeleton', {pageName: "logout", title: 'Logging out...'})
})

router.get('/*', function(req, res) {
    res.render('404', {pageName: "404", title: 'Page not found'})
})

module.exports = router