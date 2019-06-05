const express = require('express')

const { uploadController } = require('../controllers/index')
const { catchErrors } = require('../middleware/error-handler')

const router = express.Router()

const ejwt = require('express-jwt')
const SECRET_TOKEN = process.env.SECRET_TOKEN

router.post('/', ejwt({secret: SECRET_TOKEN}), catchErrors(uploadController.index))

module.exports = router