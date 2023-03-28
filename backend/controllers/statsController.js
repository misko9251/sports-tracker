const Team = require('../models/Team')

module.exports = {
    addGoal: async (req, res) => {
        const {teamId, playerId} = req.params
        try {
            const currentTeam = await Team.findById({_id: teamId})
            const playerIndex = currentTeam.roster.findIndex((player)=> player._id == playerId)
            if(playerIndex === -1){
                return res.status(404).json({msg: 'Player not found'})
            }
            currentTeam.roster[playerIndex].stats.goals++
            await currentTeam.save()
            res.status(200).json({msg: 'Goal added'})
        } catch (error) {
            console.log(error)
            res.status(500).json({ msg: 'Server error' });
        }
    },
    addAssist: async (req, res) => {
        const {teamId, playerId} = req.params
        try {
            const currentTeam = await Team.findById({_id: teamId})
            const playerIndex = currentTeam.roster.findIndex((player)=> player._id == playerId)
            if(playerIndex === -1){
                return res.status(404).json({msg: 'Player not found'})
            }
            currentTeam.roster[playerIndex].stats.assists++
            await currentTeam.save()
            res.status(200).json({msg: 'Assist added'})
        } catch (error) {
            console.log(error)
            res.status(500).json({ msg: 'Server error' });
        }
    }
}