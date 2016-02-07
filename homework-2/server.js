var express = require('express')
var swig = require('swig')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var uuid = require('uuid')

var Schema = mongoose.Schema

mongoose.connect('mongodb://localhost/homework-2')

var placeSchema = new Schema({
  name: String,
  description: String,
  address: String,
  city: String,
  uuid: {type: String, default: uuid.v4}
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

application.get('/city/:city', function(request, response){
  Place.find({'city':request.params.city}, function(error, places){
    if(error){
      return response.send(500, 'Internal Server Error')
    }

    response.render("city", {
      title: 'City listing',
      places: places
    })
  })
})

application.post('/create', function(request, response){
  Place.create({
    name: request.body.name,
    description: request.body.description,
    address: request.body.address,
    city: request.body.city
  }, function(error, document){
    if(error){
      return response.send(500, 'Internal Server Error')
    }

    response.redirect('/')
  })
})

application.listen(3000, function () {
   console.log('Example application listening on port 3000!')
})
