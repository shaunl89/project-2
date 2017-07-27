const express = require('express')
const router = express.Router()

const usersController = require('../controller/users_controller')

const passport = require('../config/passport')

// all url paths already begin with '/users'
router.get('/signup', usersController.register)

router.get('/login', function (req, res) {
  res.render('users/login')
})

router.post('/signup', usersController.create)

router.post('/login', passport.authenticate('local', {
  successRedirect: '/users/profile',
  failureRedirect: '/users/login'
}))

// non public route
router.get('/profile', usersController.authenticatedUser, usersController.show)

router.get('/logout', usersController.logout)

module.exports = router
