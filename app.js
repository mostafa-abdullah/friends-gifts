var express = require('express')
var mongoose = require('mongoose')
require('dotenv').config()
var routes = require('./routes')
var bodyParser = require('body-parser')
var app = express()

mongoose.connect(process.env.MONGO_URL).catch(err => { console.log(err) })

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/', routes)

const port = 5000
app.listen(port, () => {
  console.log('Started app on ' + port)
})
