const express = require('express')

const { adminController } = require('../controllers/index')
const { catchErrors } = require('../middleware/error-handler')

const router = express.Router()

const ejwt = require('express-jwt')
const SECRET_TOKEN = process.env.SECRET_TOKEN

router.get('/users', ejwt({secret: SECRET_TOKEN}), catchErrors(adminController.users))
router.get('/users/:id', ejwt({secret: SECRET_TOKEN}), catchErrors(adminController.usersOne))
router.delete('/users/:id', ejwt({secret: SECRET_TOKEN}), catchErrors(adminController.usersDelete))
router.post('/users/:id/role', ejwt({secret: SECRET_TOKEN}), catchErrors(adminController.setRole))
router.get('/messages/search', ejwt({secret: SECRET_TOKEN}), catchErrors(adminController.messagesSearch))
router.delete('/messages/:id', ejwt({secret: SECRET_TOKEN}), catchErrors(adminController.messagesDelete))

module.exports = router