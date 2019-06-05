const express = require('express')
const ejwt = require('express-jwt')
const router = express.Router()
const SECRET_TOKEN = process.env.SECRET_TOKEN

const { scrapingController } = require('../controllers/index')
const { catchErrors } = require('../middleware/error-handler')

const jwtMW = ejwt({
    secret: SECRET_TOKEN
})

router.post('/meta', jwtMW, catchErrors(scrapingController.meta))

module.exports = router