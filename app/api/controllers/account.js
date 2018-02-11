var bcrypt = require('bcrypt')
var mysql = require('mysql')
var sanitizer = require('sanitizer')
var db = require('../../core/db')
var jwt = require('jsonwebtoken')

exports.login = function login(req, res) {

    var con = req.app.locals.con

    username = sanitizer.sanitize(req.body.username)
    password = sanitizer.sanitize(req.body.password)

    response = {auth: null}

    db.query("SELECT * FROM users WHERE username=?", [username], function(err, result) {
        if(err) return false
        if(result.length <= 0) {
            res.send(response)
            return 0
        }
        

        bcrypt.compare(password, result[0].password, function(err, same) {
            if(err || !same) {
                res.send(response)
            } else {
                user = {
                    username: username,
                    email: result[0].email,
                    joinDate: new Date(result[0].creation_time)
                }

                response.auth = jwt.sign(user, req.app.locals.authSecret)                
                res.json(response)
            }
        })
    })

}

exports.register = function register(req, res) {

    
    bcrypt.hash(sanitizer.sanitize(req.body.password), 10, function(err, hash) {
        var user = [
            sanitizer.sanitize(req.body.username),
            sanitizer.sanitize(req.body.email),
            hash
        ]

    db.query("INSERT INTO users VALUES (0, ?, ?, ?, now())", user, function(err, result) {
            if(err) {
                res.json({success: false})
                return
            }
            res.json({success: true})
        })
    })
}

