const mongoose = require('mongoose')
const trunks = require('trunks-log')
const log = new trunks('FAVOURITES')

const definition = {
    user_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    message_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
        required: true
    }],
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
}

const options = {}

const favouriteSchema = new mongoose.Schema(definition, options)

module.exports = mongoose.model('Favourite', favouriteSchema)