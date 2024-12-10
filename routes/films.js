const express = require('express')
const router = express.Router()

const FilmsController = require('../controllers/FilmsController.js')

router.get('/', FilmsController.index)

router.get('/:id', FilmsController.show)


module.exports = router