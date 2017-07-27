const express = require('express')
const router = express.Router()

const journalsController = require('../controller/journals_controller')

router.get('/', journalsController.index)

router.get('/:id', journalsController.show)

router.post('/', journalsController.create)

router.put('/:id', journalsController.update)

router.delete('/:id', journalsController.destroy)

// router.put for update
// router.delete for delete

module.exports = router
