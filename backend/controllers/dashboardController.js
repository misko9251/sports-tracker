const User = require('../models/User')
const Team = require('../models/Team')
const cloudinary = require('../middleware/cloudinary')

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
        try {
            await Team.create({
                sport: req.body.sport,
                sportType: req.body.sportType,
                age: req.body.age,
                managedBy: req.user._id,
                record: '0-0',
                teamName: req.body.teamName
            })
        } catch (error) {
            console.log(error)
        }
    },
    getTeams: async (req, res) => {
        const teams = await Team.find({managedBy: req.user._id})
        res.status(200).json({teams})
    },
    teamProfile: async (req, res) => {
        const team = await Team.findOne({_id: req.params.id})
        res.status(200).json({team})
    },
    addPlayer: async (req, res) => {
        try {
            const fileStr = req.body.previewSource
            const result = await cloudinary.uploader.upload(fileStr);
            const currentTeam = await Team.findById({_id: req.params.id})
            const teamName = currentTeam.teamName
            let profileImg
            if(req.body.previewSource){
                profileImg = result.secure_url
            }else{
                profileImg = '/src/assets/default-athlete.png'
            }
            await Team.findByIdAndUpdate({_id: req.params.id}, {
                $push: {
                    roster: {
                        player: req.body.name,
                        position: req.body.position,
                        team: teamName,
                        image: profileImg
                    }
                }
            })
            res.status(200).json({msg: 'Player added'})
        } catch (error) {
            console.log(error)
        }
    },
    addStaff: async (req, res) => {
        try {
            await Team.findByIdAndUpdate({_id: req.params.id}, {
                $push: {
                    staff: {
                        name: req.body.name,
                        title: req.body.title
                    }
                }
            })
        } catch (error) {
            console.log(error)
        }
    },
    getTeamInfo: async (req, res) => {
        try {
            const team = await Team.findOne({_id: req.params.id})
            const staffMembers = team.staff
            const roster = team.roster
            res.status(200).json({staffMembers, roster})
        } catch (error) {
            console.log(error)
        }
    },
    deleteStaff: async (req, res) => {
        try {
            const staffId = req.body 
            const currentTeamId = req.params.id
            await Team.findByIdAndUpdate({_id: currentTeamId},{
                $pull: {staff: {_id: staffId}}
            })
            res.status(200).json({msg: 'Staff member deleted'})
        } catch (error) {
            console.log(error)
            res.status(500).json({msg: 'Error deleting staff member'})
        }
    },
    addToSchedule: async (req, res) => {
        console.log(req.body)
    }
}