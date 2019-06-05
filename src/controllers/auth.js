const { User } = require('../database/models')
const trunks = require('trunks-log')
const log = new trunks('AUTH')
const jwt = require('jsonwebtoken')
const SECRET_TOKEN = process.env.SECRET_TOKEN

exports.register = async (req, res) => {
    let user = new User(req.query)

    await user.save().then(user => {
        log.success('Register User: {}', user.login)
        res.status(201).json({ data: user })
    })
    .catch(error => {
        log.error(error, 'Error register user: {}', user.login)    
        let errStatus = error.name === 'ValidationError' ? 400 : 500
        res.status(errStatus).json({ message: errStatus === 400 ? error._message : 'Something went wrong' })
    })
}

exports.login = async (req, res) => {
    let login = req.query.login
    let password = req.query.password

    await User.findOne({ login: login })
        .then(user => {
            user.comparePassword(password)
                .then(isMatch => {
                    let token = jwt.sign({ _id: user._id }, SECRET_TOKEN)
                    log.success('Success logined by login {}', login)
                    res.setHeader('Authorization', token)
                    res.status(200).json({
                        data: user
                    })

                }).catch(err => {
                    log.error(err, 'Login or password incorrect {}', user)
                    res.status(404).json({ message: 'Login or password incorrect' })
                })
        })
        .catch(err => {
            let notFoundMessage = 'User not found by login {}'
            log.error(err, notFoundMessage, login)
            res.status(404).json({ message: notFoundMessage })
        })
}

exports.user = async (req, res) => {
    await User.findById(req.user._id).exec()
        .then(user => {
            log.success('Found user: {}', user.login)
            res.json({ data: user })
        })
        .catch(err => {
            log.error(err, 'Error finding user: {}', req.params.id)
            res.json({ error: err, message: 'Could not retrieve user'}).status(500)
        })
}