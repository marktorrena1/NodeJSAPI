
var express = require('express')
var router = express.Router()

var User = require('../models/User.js')
var Auth = require('../factory/Auth')
module.exports = router;

router.get('/', Auth.verifyToken,(req,res,next) => {
    User.find({},function(err,users){
        res.status(200).send(users)
    })
})

router.get('/:id', Auth.verifyToken ,(req,res,next) => {
    User.findById(req.params.id, (err,user)=> {
        if(err) res.status(500).send(err);
        res.status(200).send(user);
    })
})

