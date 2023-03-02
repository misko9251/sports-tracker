const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const TeamSchema = new mongoose.Schema({
    sport: {
        type: String,
    },
    sportType: {
        type: String,
    },
    age: {
        type: String,
    },
    managedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    record: {
        type: String
    },
    teamName: {
        type: String
    },
    roster: [{
        player: {
            type: String
        },
        position: {
            type: String
        },
        team: {
            type: String
        },
        image: {
            type: String,
            default: 'frontend/src/assets/default-athlete.png'
        },

    }]
})

module.exports = mongoose.model("Team", TeamSchema)