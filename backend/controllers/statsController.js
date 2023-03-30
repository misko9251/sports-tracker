const Team = require('../models/Team')

module.exports = {
    updateHockeyStats: async (req, res) => {
        // Game stats to loop through and grab events
        const {gameStats} = req.body
        // Destructure current team and the eventId which represents the scheduled event we are on
        const {teamId, eventId} = req.params
        // Grab current team
        const currentTeam = await Team.findById({_id: teamId})
        // Find the index of the current scheduled event
        const eventIndex = currentTeam.schedule.findIndex((game)=> game._id == eventId)
        // This method fires when we click end game, so below we are setting is complete to true
        currentTeam.schedule[eventIndex].isComplete = true
        // Loop through the game action and grab all the events, save in a new array
        const events = gameStats.map((item)=> (item.event))
        // Set the gameEvents value to the events we looped through above
        currentTeam.schedule[eventIndex].gameEvents = events
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