
var express = require('express')
var router = express.Router()

var User = require('../models/User.js')

module.exports = router;

router.post('/register',(req,res) => {

    var user = new User(req.body)
    user.save((err,result) => {
        if(err) res.status(500).send(err);
        else res.status(200).send(result);
    });

})

router.get('/users',(req,res) => {
    User.find({},function(err,users){
        res.status(200).send(users)
    })
})

