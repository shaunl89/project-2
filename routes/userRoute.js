express = require('express')
const router = express.Router()

const usersController = require('../controller/users_controller')

// all file paths already begin with '/users'
router.get('/new', usersController.register)

router.post('/', usersController.create)

module.exports = router
