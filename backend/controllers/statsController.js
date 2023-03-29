const Team = require('../models/Team')

module.exports = {
    updateHockeyStats: async (req, res) => {
        const {gameStats} = req.body
        const {teamId} = req.params
        const currentTeam = await Team.findById({_id: teamId})
        try {
         gameStats.forEach((stat)=>{
            const {event, playerId} = stat
            if(event.includes('scored a goal')){
                const playerIndex = currentTeam.roster.findIndex((player)=> player._id == playerId)
                if(playerIndex !== -1){
                    currentTeam.roster[playerIndex].stats.goals++
                }
            }else if(event.includes('assisted on a goal')){
                const playerIndex = currentTeam.roster.findIndex((player)=> player._id == playerId)
                if(playerIndex !== -1){
                    currentTeam.roster[playerIndex].stats.assists++
                }
            }else if(event.includes('missed a shot')){
                const playerIndex = currentTeam.roster.findIndex((player)=> player._id == playerId)
                if(playerIndex !== -1){
                    currentTeam.roster[playerIndex].stats.missedShots++
                }
            }else if(event.includes('made a save')){
                const playerIndex = currentTeam.roster.findIndex((player)=> player._id == playerId)
                if(playerIndex !== -1){
                    currentTeam.roster[playerIndex].stats.saves++
                }
            }
         })
         await currentTeam.save();
         res.status(200).json({msg: 'Stats updated'});
        } catch (error) {
         console.log(error)
        }
    }
}