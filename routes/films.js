const express = require('express')
const router = express.Router()

const FilmsController = require('../controllers/FilmsController.js')

router.get('/', FilmsController.index)

router.get('/:id', FilmsController.show)

router.post('/:id/review', FilmsController.createRev)



module.exports = router