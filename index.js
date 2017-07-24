// requiring all modules installed
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')

// connecting mongoose
const url = 'mongodb://localhost:27017/project-2'

mongoose.Promise = global.Promise
mongoose.connect(url, {
  useMongoClient: true
}).then(
  function () {
    console.log('connected successfully to Mongodb')
  },
  function (err) {
    console.log(err)
  }
)

// middleware stuff
app.use(express.static('public'))
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
  // we're missing store: newMongoStore
}))
app.use(flash())

// setup for files project needs to require
// require ROUTERS here
const usersRoute = require('./routes/userRoute')

// setup for project routes
// paths (public / non public?)
app.get('/', function (req, res) {
  res.render('home')
})
app.get('/about', function (req, res) {
  res.render('about')
})
app.use('/users', usersRoute)

// non public paths

// opening the port
const port = process.env.PORT || 6660
app.listen(port, function () {
  console.log(`express is running on ${port}`)
})
