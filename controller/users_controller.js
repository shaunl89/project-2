const User = require('../models/User')

function register (req, res) {
  res.render('users/signup', {
    flash: req.flash('errors')
  })
}

function create (req, res) {
  var newUser = new User({
    name: req.body.user.name,
    email: req.body.user.email,
    password: req.body.user.password
  })

  newUser.save(function (err, createdUser) {
    if (err) {
      // return res.send(err)
      req.flash('errors', err.message)
      return res.redirect('/users/signup')
    }

    res.redirect('/users/login')
  })
}

function show (req, res) {
  User.findOne({
    _id: req.user
  },
  function (err, user) {
    if (err) {
      return res.send(err)
    } else {
      console.log(user)
      res.render('users/profile', {
        user: user
      })
    }
  })
}

function logout (req, res) {
  req.logout()
  res.redirect('/')
}

// check if user is authenticated before allowing access to non public pages
function authenticatedUser (req, res, next) {
  if (req.isAuthenticated()) return next()

  req.flash('errors', 'Login to access!')
  // FIX THE FLASH
  res.redirect('/users/login')
}

// update fn findByIdAndUpdate

// delete fn findByIdAndUpdate

module.exports = {
  register,
  create,
  logout,
  show,
  authenticatedUser
}
