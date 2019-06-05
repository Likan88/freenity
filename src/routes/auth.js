const express = require('express')

const { authController } = require('../controllers/index')
const { catchErrors } = require('../middleware/error-handler')

const router = express.Router()

const ejwt = require('express-jwt')
const SECRET_TOKEN = process.env.SECRET_TOKEN

router.post('/login', catchErrors(authController.login))

router.post('/register', catchErrors(authController.register))

router.get('/user', ejwt({secret: SECRET_TOKEN}), catchErrors(authController.user))

module.exports = router
