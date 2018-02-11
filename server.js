// Load modules
var config = require('./app/config')
var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var jwt = require('jsonwebtoken')

var app = express()



app.locals.appName = config.app.name
app.locals.authSecret = config.authSecret

app.use(function(req, res, next) {
    if(req.headers && req.headers.authorization) {
        jwt.verify(req.headers.authorization, config.authSecret, function(err, decoded) {
            if(!err) {
                req.user = decoded
                
                return
            } 

            req.user = undefined
        })
    }
    
    next()
})

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(bodyParser.json())

app.use('/res', express.static(path.join(__dirname, '/app/static')))
app.use(require('./app/routes'))
app.set('view engine', 'pug')
app.set('views', './app/views')








var server = app.listen(8080, function() {
    console.log("Started server")
});

