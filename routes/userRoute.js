express = require('express')
const router = express.Router()

const usersController = require('../controller/users_controller')

const passport = require('../config/passport')

// all url paths already begin with '/users'
router.get('/signup', usersController.register)

router.post('/signup', usersController.create)

router.get('/login', function (req, res) {
  res.render('users/login')
})

router.get('/profile', function (req, res) {
  res.render('users/profile')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/users/profile',
  failureRedirect: '/users/login'
}))

module.exports = router
