var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()

//cors enabled
app.use(cors())

//configure body parser for json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

//api end points
app.get('/test',(req,res) => {
    res.json({result: 'Hello World'})
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

app.listen(3000, () => console.log('App listening on port 3000!'))