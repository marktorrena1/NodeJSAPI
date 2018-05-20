var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config/config');
var express = require('express');
var router = express.Router();

var User = require('../models/User');
var Auth = require('../factory/Auth');

module.exports = router;

router.post('/register',(req,res) => {
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);

    User.create({
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        password : hashedPassword
    },
    (err,user) =>{
        if (err) return res.status(500).send("There was a problem registering the user.")
        // create a token
        var token = jwt.sign({ id: user._id, username: user.username }, config.secret, {
          expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({ auth: true, token: token });
    });
});

router.get('/me', Auth.verifyToken, (req, res, next) => {

    User.findById(req.userId, { password: 0 }, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        
        res.status(200).send(user);
    });
    
});

router.post('/token',(req,res) => {
    User.find(req.username, (err,user) => {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");

        var hashedPassword = bcrypt.hashSync(req.body.password, 8);
        bcrypt.compare(req.body.password, hashedPassword,(err, result) => {
            if(err) return res.status(500).send("There was a problem comparing the password."+ err);
            if(result) {
                var token = jwt.sign({ id: user._id, username: user.username }, config.secret, {
                    expiresIn: 86400 // expires in 24 hours
                });
                return res.status(200).send({ auth: true, token: token });
            } 
            else return res.status(500).send("There was a problem in username or password."+ err);       
        })
    })
})