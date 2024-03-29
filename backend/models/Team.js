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
        stats: {
            assists: { type: Number, default: 0 },
            goals: { type: Number, default: 0 },
            saves: { type: Number, default: 0 },
            missedShots: { type: Number, default: 0 },
            reboundsBB: { type: Number, default: 0 },
            assistsBB: { type: Number, default: 0 },
            blockBB: { type: Number, default: 0 },
            stealBB: { type: Number, default: 0 },
            freeThrowsBB: { type: Number, default: 0 },
            pointsBB: { type: Number, default: 0 },
            touchdownFB: { type: Number, default: 0 },
            fieldgoalFB: { type: Number, default: 0 },
            patFB: { type: Number, default: 0 },
            twoPointConversionFB: { type: Number, default: 0 },
            safetyFB: { type: Number, default: 0 },
            tdPassFB: { type: Number, default: 0 },
            interceptionFB: { type: Number, default: 0 },
            tackleFB: { type: Number, default: 0 },
            sackFB: { type: Number, default: 0 },
            goalsSoccer: { type: Number, default: 0 },
            assistsSoccer: { type: Number, default: 0 },
            missedShotsSoccer: { type: Number, default: 0 },
            savesSoccer: { type: Number, default: 0 },
            servesVB: { type: Number, default: 0},
            pointsVB: { type: Number, default: 0},
            goalsLax: { type: Number, default: 0 },
            assistsLax: { type: Number, default: 0 },
            missedShotsLax: { type: Number, default: 0 },
            savesLax: { type: Number, default: 0 },
            hitsBBSB: { type: Number, default: 0 },
            pitchCountBBSB: { type: Number, default: 0 },
            hitByPitch: { type: Number, default: 0 },
            foulsBBSB: { type: Number, default: 0 },
            homerunsBBSB: { type: Number, default: 0 },
            atBatsBBSB: { type: Number, default: 0 },
            outsBBSB: { type: Number, default: 0 },
        },
        position: { type: String },
        team: { type: String },
        teamId: {type: String},
        image: { type: String, default: 'frontend/src/assets/default-athlete.png'},
        videos: [{
            url: { type: String },
            description: { type: String }
        }],
        contacts: [{
            name: { type: String },
            relationship: { type: String },
            phoneNumber: { type: String }
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
        isComplete: {type: Boolean, default: false},
        location: { type: String },
        gameEvents: { type: [String] },
        myScore: {type: Number, default: 0},
        opponentScore: {type: Number, default: 0}
    }],
    videos: [{
        url: { type: String }, 
        description: { type: String }
    }],
    wins: {type: Number, default: 0},
    losses: {type: Number, default: 0}
})

module.exports = mongoose.model("Team", TeamSchema)