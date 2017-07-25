const express = require('express')
const router = express.Router()

const journalsController = require('../controller/journals_controller')

router.post('/profile', journalsController.create)

module.exports = router
