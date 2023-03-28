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
        stats: [{
            gamesPlayed: { type: String },
            shots: { type: String },
            goals: { type: String },
            saves: { type: String },
            missedShots: { type: String }
        }],
        position: { type: String },
        team: { type: String },
        teamId: {type: String},
        image: { type: String, default: 'frontend/src/assets/default-athlete.png'},
        videos: [{
            url: { type: String },
            description: { type: String }
        }]
    }],
    staff: [{
        name: { type: String },
        title: { type: String }
    }],
    schedule: [{
        teamId: { type: String },
        sport: { type: String },
        eventType: { type: String },
        homeOrAway: { type: String },
        opponent: { type: String },
        date: {type: Date},
        time: { type: String },
        month: { type: String },
        day: { type: String },
        year: { type: String },
        dayOfWeek: { type: String },
        location: { type: String }
    }],
    videos: [{
        url: { type: String }, 
        description: { type: String }
    }]
})

module.exports = mongoose.model("Team", TeamSchema)