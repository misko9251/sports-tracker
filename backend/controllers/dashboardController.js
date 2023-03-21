const User = require('../models/User')
const Team = require('../models/Team')
const cloudinary = require('../middleware/cloudinary')
const moment = require('moment')

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
                        teamId: req.params.id,
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
            res.status(200).json({msg: 'Staff added'})
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
        try {
            const regularTime = moment(req.body.time, 'HH:mm').format('h:mm A')
            const currentTeamId = req.params.id
            const date = moment(req.body.date).utc().format('MMMM D YYYY dddd');
            const dateArray = date.split(' ')
            const month = dateArray[0]
            const day = dateArray[1]
            const year = dateArray[2]
            const dayOfWeek = dateArray[3].split('').slice(0, 3).join('').toUpperCase()
            if(req.body.eventType === 'Game'){
                await Team.findByIdAndUpdate({_id: currentTeamId}, {
                    $push: {
                        schedule: {
                            teamId: currentTeamId,
                            eventType: req.body.eventType,
                            homeOrAway: req.body.homeOrAway,
                            opponent: req.body.opponent,
                            date: req.body.date,
                            time: regularTime,
                            month: month,
                            day: day,
                            year: year,
                            dayOfWeek: dayOfWeek
                        }
                    }
                })
            }else{
                await Team.findByIdAndUpdate({_id: currentTeamId}, {
                    $push: {
                        schedule: {
                            eventType: req.body.eventType,
                            date: req.body.date,
                            time: regularTime,
                            month: month,
                            day: day,
                            year: year,
                            dayOfWeek: dayOfWeek,
                            location: req.body.location
                        }
                    }
                })
            }
            res.status(200).json({msg: 'Added to db'})
        } catch (error) {
            console(error)
        }
    },
    getSchedule: async (req, res) => {
        try {
            const team = await Team.findOne({_id: req.params.id})
            const schedule = team.schedule
            res.status(200).json({schedule})
        } catch (error) {
            console.log(error)
        }
    },
    addVideo: async (req, res) => {
        try {
            const fileStr = req.body.previewSource
            const result = await cloudinary.uploader.upload(fileStr, {
                resource_type: 'video'
            });
            const videoUrl = result.secure_url
            await Team.findByIdAndUpdate({_id: req.params.id}, {
                $push: {
                    videos: {
                        url: videoUrl,
                        description: req.body.description
                    }
                }
            })
            res.status(200).json({msg: 'Added video url to db'})
        } catch (error) {
            console.log(error)   
        }
    },
    getVideos: async (req, res) => {
        try {
            const team = await Team.findOne({_id: req.params.id})
            const videos = team.videos
            res.status(200).json({videos: videos})
        } catch (error) {
            console.log(error)
        }        
    },
    addPlayerVideo: async (req, res) => {
        try {
            const {teamId, playerId} = req.params
            const team = await Team.findOne({_id: teamId})
            const fileStr = req.body.previewSource
            const result = await cloudinary.uploader.upload(fileStr, {
                resource_type: 'video'
            });
            const videoUrl = result.secure_url
            const playerIndex = team.roster.findIndex((player) => player._id == playerId)
            
            team.roster[playerIndex].videos.push({
                url: videoUrl,
                description: req.body.description
            
            });
            await team.save()
            res.status(200).json({msg: 'Player video uploaded'})
        } catch (error) {
            console.log(error)
        }
    },
    getPlayerVideos: async (req, res) => {
        try {
            const {teamId, playerId} = req.params
            const team = await Team.findOne({_id: teamId})
            const playerIndex = team.roster.findIndex((player) => player._id == playerId)
            const videos = team.roster[playerIndex].videos
            res.status(200).json({videos: videos})
        } catch (error) {
            console.log(error)
        }
    },
    getPlayer: async (req, res) => {
        try {
            const {teamId, playerId} = req.params
            const team = await Team.findOne({_id: teamId})
            const playerIndex = team.roster.findIndex((player) => player._id == playerId)
            const player = team.roster[playerIndex]
            res.status(200).json({player: player})
        } catch (error) {
            console.log(error)
        }
    }
}