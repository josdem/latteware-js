var express = require('express')
var swig = require('swig')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var uuid = require('uuid')
var bcrypt = require('bcrypt-nodejs')

var session = require('express-session')
var MongoStore = require('express-session-mongo')
var flash = require('flash')

var Schema = mongoose.Schema

mongoose.connect('mongodb://airbnbUser:41rbnbDB@localhost:27017/airbnb')

var userSchema = Schema({
  username: String,
  displayName: String,
  password: String,
  uuid : {type: String, default: uuid.v4}
})

var User = mongoose.model('User', userSchema)

var placeSchema = new Schema({
  name: String,
  description: String,
  address: String,
  city: String,
  uuid: {type: String, default: uuid.v4}
})

var Place = mongoose.model('Place', placeSchema)

var application = express()

  application.use(session({
    secret: 'keyboard cat',
    store: new MongoStore(),
    saveUninitialized: true,
    resave: true
  }))

application.use( flash() )

  application.engine('html', swig.renderFile)
  application.set('view engine', 'html')
  application.set('views', __dirname + '/views')

  application.set('view cache', false)
swig.setDefaults({cache:false})

application.use( bodyParser.urlencoded({ extended:false }) )
  application.use('/assets', express.static('public'))

  application.use(function (req, res, next) {
    if(!req.session.userId){
      return next()
    }

    User.findOne({uuid: req.session.userId}, function(err, user){
      if(err){
        return res.send(500, 'Internal Server Error')
      }

      res.locals.user = user
        next()
    })
  });

application.get('/', function (req, res) {
  User.find({}, function(err, users){
    if(err){
      return res.send(500, 'Internal Server Error')
    }

    res.render('index', {
      title: "AirBnb",
      users:users
    })
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

application.post('/city/:city/:uuid/remove', function(request, response){
  Place.findOne({uuid:request.params.uuid}, function(error, place){
    if(error){
      return response.send(500, 'Internal Server Error')
    }

    place.remove(function(error){
      if(error){
        return response.send(500, 'I could not remove place')
      }
    })

    response.redirect('/city/' + request.params.city)
  })
})

application.get('/log-in', function (req, res){
  var error = res.locals.flash.pop()

    res.render('log-in',{
      error: error
    })
})


application.post('/log-in', function (req, res){
  if(!req.body.username || !req.body.password){
    req.flash('log-in-error', 'To log in you need a username and a password')
      return res.redirect('/log-in')
  }

  User.findOne({username: req.body.username}, function(err, doc){
    if(err){
      return res.send(500, 'Internal Server Error')
    }

    if(!doc){
      req.flash('log-in-error', 'Invalid user')
        return res.redirect('/log-in')
    }

    bcrypt.compare(req.body.password, doc.password, function(err, result){
      if(err){
        return res.send(500, 'Internal Server Error')
      }

      req.session.userId = doc.uuid
        res.redirect('/')
    })
  })
})

application.get('/sign-up', function (req, res){
  var error = res.locals.flash.pop()

    res.render('sign-up', {
      error: error
    })
})

application.post('/sign-up', function (req, res){
  if(!req.body.username || !req.body.password){
    req.flash('sign-up-error', 'To sign up you need a username and a password')
      return res.redirect('/sign-up')
  }

  User.findOne({username: req.body.username}, function(err, doc){
    if(err){
      return res.send(500, 'Internal Server Error')
    }

    if(doc){
      req.flash('sign-up-error', 'Username is taken')
        return res.redirect('/sign-up')
    }

    bcrypt.hash(req.body.password, null/* Salt */, null, function(err, hashedPassword) {
      if(err){
        return res.send(500, 'Internal Server Error')
      }

      User.create({
        username: req.body.username,
        password: hashedPassword
      }, function(err, doc){
        if(err){
          return res.send(500, 'Internal Server Error')
        }

        req.session.userId = doc.uuid
          res.redirect('/')
      })
    });
  })
})

application.get('/log-out', function (req, res){
  req.session.destroy()
    res.redirect('/')
})

application.listen(3000, function () {
  console.log('Example application listening on port 3000!')
})
