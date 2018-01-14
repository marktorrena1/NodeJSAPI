var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var app = express()

var User = require('./models/User.js')
//cors enabled
app.use(cors())

//configure body parser for json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

//api end points
app.get('/test',(req,res) => {
    res.json({result: 'Hello Mark Jeo'})
})

app.get('/token/:username',(req,res) => {
    res.json({result : req.params.username})
})

app.post('/token',(req,res) => {
    console.log(req.body)
    var data = {
        name : req.body.username,
        fullname: req.body.fullname
    }
    res.json(data)
})

app.post('/register',(req,res) => {
    var userData = req.body;
    var user = new User(userData)

    user.save((err, result) => {
        if(err) console.log(err);
        
        res.sendStatus(200);
    })

})

mongoose.connect('mongodb://markjeo:markjeo@ds251747.mlab.com:51747/nodedb',{ useMongoClient: true }, (err) => {
    if(!err) console.log('connected to mongo')
})
app.listen(3000, () => console.log('App listening on port 3000!'))