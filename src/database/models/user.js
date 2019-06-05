const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10

const definition = {
    login: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
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

const userSchema = new mongoose.Schema(definition, options)

userSchema.pre('save', function(next) {
    let user = this;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword) {
    return new Promise((res, rej) => {
        bcrypt.compare(candidatePassword, this.password)
            .then(isMatch => {
                if (isMatch) {
                    res(isMatch)
                } else {
                    rej(isMatch)
                }
            })
    })
};

module.exports = mongoose.model('User', userSchema)