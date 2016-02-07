var express = require('express')
var swig = require('swig')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')

var Schema = mongoose.Schema

mongoose.connect('mongodb://localhost/tarea-2')

// Declara tus modelos en este espacio
// Termina la declaracion de modelos

var app = express()

 // Configurar de swig!
app.engine('html', swig.renderFile)
app.set('view engine', 'html')
app.set('views', __dirname + '/views')

// Configurar cache
app.set('view cache', false)
swig.setDefaults({cache:false})// <-- Cambiar a true en produccion

// Agregamos body parser a express
app.use( bodyParser.urlencoded({ extended:false }) )

app.get('/', function (request, response) {
  response.render("index", {
    title: "AirBnb"
  })
})

app.get('/listing', function (request, response) {
  response.render("listing", {
    title: "listing"
  })
})


// Termina la declaracion de url handlers

app.listen(3000, function () {
   console.log('Example app listening on port 3000!')
})
