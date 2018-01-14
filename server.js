var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var app = express()

var userCtrl = require('./controller/UserController.js')

//cors enabled
app.use(cors())

//configure body parser for json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())


//api end points
app.use('/api/auth', userCtrl);


mongoose.connect('mongodb://markjeo:markjeo@ds251747.mlab.com:51747/nodedb',{ useMongoClient: true }, (err) => {
    if(!err) console.log('connected to mongo')
})
app.listen(3000, () => console.log('App listening on port 3000!'))