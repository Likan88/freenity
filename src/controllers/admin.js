const { Message, User } = require('../database/models')
const mongoose = require('mongoose')
const trunks = require('trunks-log')
const log = new trunks('MESSAGES')

exports.users = async (req, res) => { 
    let limit = parseInt(req.query.limit || 10)
    let offset = parseInt(req.query.offset || 0)
    let order = req.query.order || 'created_at DESC'
    let name = req.query.name || undefined
    let role = req.query.role || undefined

    let order_field = order.split(' ')[0]
    let order_direction = order.split(' ')[1] == 'DESC' ? -1 : 1

    let users_count = 0

    await User.find().exec()
    .then(users => {
        users_count = JSON.parse(JSON.stringify(users)).length
    })

    let filter = {}

    if (name)
        filter.login = { $regex: '.*' + name + '.*' }

    if (role)
        filter.role = role

    await User.find(filter).sort([[order_field, order_direction]])
    .skip(offset).limit(limit).exec().then(users => {
        return res.status(200).json({
            status: 'success',
            count: users_count,
            users: users
        })
    })
}

exports.setRole = async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, {role: req.query.role}, { new: true })
        .then(() => {
            return res.status(200).json({
                success: true
            })
        }).catch(() => {
            return res.status(200).json({
                success: false
            })
        })
}

exports.messagesSearch = async (req, res) => {
    let limit = parseInt(req.query.limit || 10)
    let offset = parseInt(req.query.offset || 0)
    let order = req.query.order || 'created_at DESC'
    let name = req.query.name || undefined
    let user_id = req.query.user_id || undefined

    let order_field = order.split(' ')[0]
    let order_direction = order.split(' ')[1] == 'DESC' ? -1 : 1

    let filter = {}

    if (name) {
        filter.$or = [
            { title: new RegExp(name, "i") },
            { comment: new RegExp(name, "i") },
        ]
    }

    if (user_id && mongoose.Types.ObjectId.isValid(user_id)) {
        filter.$and = [
            { user_id: mongoose.Types.ObjectId(user_id) }
        ]
    }

    let messages_count = 0

    await Message.find(filter).sort([[order_field, order_direction]]).exec()
    .then(messages => {
        messages_count = JSON.parse(JSON.stringify(messages)).length
    })

    await Message.find(filter).sort([[order_field, order_direction]])
    .skip(offset).limit(limit).exec().then(messages => {
        messages = JSON.parse(JSON.stringify(messages))
        return res.status(200).json({
            status: 'success',
            count: messages_count,
            messages: messages
        })
    })
}

exports.messagesDelete = async (req, res) => {
    await Message.findById(req.params.id).remove().exec()
    res.json({
        message: 'Deleted'
    })
}

exports.usersDelete = async (req, res) => {
    await User.findById(req.params.id).remove().exec()
    res.json({
        message: 'Deleted'
    })
}

exports.usersOne = async (req, res) => {
    User.findById(req.params.id).then(async (user) => {
        res.json({
            status: 'success',
            user: user
        })
    }).catch(async (error) => {
        res.json({
            status: 'success',
            user: null
        })
    })
}