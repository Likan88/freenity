const express = require('express')

const { settingsController } = require('../controllers/index')
const { catchErrors } = require('../middleware/error-handler')

const router = express.Router()

const ejwt = require('express-jwt')
const SECRET_TOKEN = process.env.SECRET_TOKEN

router.post('/', catchErrors(settingsController.store))

router.get('/:id', catchErrors(settingsController.show))

module.exports = router