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

application.get('/city/:city/:uuid', function(request, response){
  Place.findOne({uuid:request.params.uuid}, function(error, place){
    if(error){
      return response.send(500, 'Internal Server Error')
    }

    response.render("advertise", {
      title: 'Advertise',
      advertise: place
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

application.post('/city/:city/:uuid/description', function(request, response){
  Place.findOne({uuid:request.params.uuid}, function(error, place){
    if(error){
      return response.send(500, 'Internal Server Error')
    }

    place.description = request.body.description
    place.save(function(error){
      if(error){
        return response.send(500, 'I could not save place')
      }
    })

    response.render("advertise", {
      title: 'Advertise',
      advertise: place
    })
  })
})


application.listen(3000, function () {
   console.log('Example application listening on port 3000!')
})
