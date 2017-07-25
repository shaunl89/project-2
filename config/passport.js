const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')

passport.serializeUser(function (user, next) {
  next(null, user.id)
})

passport.deserializeUser(function (id, next) {
  User.findById(id, function (err, user) {
    next(err, user)
  })
})

passport.use(
  new LocalStrategy (
    {
      usernameField: 'user[email]',
      passwordField: 'user[password]',
      passReqToCallback: true
        },
    localVerify
  )
)

function localVerify (req, passportEmail, passportPassword, next) {
  console.log(`req.body is ${req.body}`)

  User
  .findOne({
    email: passportEmail
  })
  .exec(function (err, foundUser) {
    if (err) {
      console.log('err', err)
      return next(err)
    }

    // console.log('passportEmail:', passportEmail)
    // console.log('passportPassword:', passportPassword)

    if (foundUser && foundUser.validPassword(passportPassword)) {
      console.log('success, redirect to /profile')
      next(null, foundUser)
    } else {
      console.log('user login error')
      next(null)
    }
  })
}

module.exports = passport
