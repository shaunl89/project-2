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

module.exports = {
  register,
  create
}
