var express = require('express')
var swig = require('swig')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')

var Schema = mongoose.Schema

mongoose.connect('mongodb://localhost/homework-2')

var placeSchema = new Schema({
  name: String,
  description: String,
  address: String,
  city: String
})

var Place = mongoose.model('Place', placeSchema)

var application = express()

application.engine('html', swig.renderFile)
application.set('view engine', 'html')
application.set('views', __dirname + '/views')

application.set('view cache', false)
swig.setDefaults({cache:false})

application.use( bodyParser.urlencoded({ extended:false }) )

application.get('/', function (request, response) {
  response.render("index", {
    title: "AirBnb"
  })
})

application.get('/listing', function (request, response) {
  response.render("listing", {
    title: "listing"
  })
})

application.post('/create', function(request, response){

})

application.listen(3000, function () {
   console.log('Example application listening on port 3000!')
})
