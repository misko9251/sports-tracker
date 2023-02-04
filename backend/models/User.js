const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    registeredParent: {
        type: Boolean,
        default: false
    },
    registeredCoach: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('User', UserSchema)