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
        player: { type: String },
        position: { type: String },
        team: { type: String },
        image: { type: String, default: 'frontend/src/assets/default-athlete.png'},
    }],
    staff: [{
        name: { type: String },
        title: { type: String }
    }],
    schedule: [{
        eventType: { type: String },
        homeOrAway: { type: String },
        opponent: { type: String },
        date: {type: Date},
        time: { type: String },
        location: { type: String }

    }]
})

module.exports = mongoose.model("Team", TeamSchema)