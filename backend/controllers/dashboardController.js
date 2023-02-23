const User = require('../models/User')
const Team = require('../models/Team')

module.exports = {
    getDash: async (req, res) => {
        try {
            const currentUser = await User.findById({_id: req.user._id})
            const isRegisteredParent = currentUser.registeredParent
            const isRegisteredCoach = currentUser.registeredCoach
            res.status(200).json({isRegisteredParent, isRegisteredCoach, currentUser})
        } catch (error) {
            console.log(error)
        }
    },
    addQuestionnaire: async (req, res) => {
        const isCoach = req.body.type == 'Coach'
        const isParent = req.body.type == 'Parent'
        await User.findByIdAndUpdate({_id: req.user._id}, {
            registeredParent: isParent,
            registeredCoach: isCoach,
            preference: req.body.preference,
        })
        await Team.create({
            sport: req.body.sport,
            sportType: req.body.league,
            age: req.body.age,
            managedBy: req.user._id,
            record: '0-0',
            teamName: req.body.teamName
        })
    },
    addTeam: async (req, res) => {
        await Team.create({
            sport: req.body.sport,
            sportType: req.body.sportType,
            age: req.body.age,
            managedBy: req.user._id,
            record: '0-0',
            teamName: req.body.teamName
        })
    },
    getTeams: async (req, res) => {
        const teams = await Team.find({managedBy: req.user._id})
        res.status(200).json({teams})
    },
    teamProfile: async (req, res) => {
        const team = await Team.findOne({_id: req.params.id})
        res.status(200).json({team})
    }
}