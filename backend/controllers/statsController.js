const Team = require('../models/Team')

module.exports = {
    // Hockey 
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
    },
    // Basketball
    updateBasketballStats: async (req, res) => {
        const {gameStats} = req.body
        const {teamId, eventId} = req.params
        const currentTeam = await Team.findById({_id: teamId})
        const eventIndex = currentTeam.schedule.findIndex((event)=> event._id == eventId)
        currentTeam.schedule[eventIndex].isComplete = true
        const events = gameStats.map((item)=> (item.event))
        currentTeam.schedule[eventIndex].gameEvents = events
        try {
            gameStats.forEach((stat)=>{
                const {event, playerId} = stat
                if(event.includes('scored 2 points')){
                    const playerIndex = currentTeam.roster.findIndex((player)=> player._id == playerId)
                    if(playerIndex !== -1){
                        currentTeam.roster[playerIndex].stats.pointsBB+=2
                    }
                }else if(event.includes('scored 3 points')){
                    const playerIndex = currentTeam.roster.findIndex((player) => player._id == playerId)
                    if(playerIndex !== -1){
                        currentTeam.roster[playerIndex].stats.pointsBB+=3
                    }
                }else if(event.includes('made a free throw')){
                    const playerIndex = currentTeam.roster.findIndex((player) => player._id == playerId)
                    if(playerIndex !== -1){
                        currentTeam.roster[playerIndex].stats.pointsBB+=1
                        currentTeam.roster[playerIndex].stats.freeThrowsBB+=1
                    }
                }else if(event.includes('got the rebound')){
                    const playerIndex = currentTeam.roster.findIndex((player) => player._id == playerId)
                    if(playerIndex !== -1){
                        currentTeam.roster[playerIndex].stats.reboundsBB++
                    }
                }else if(event.includes('got the assist')){
                    const playerIndex = currentTeam.roster.findIndex((player) => player._id == playerId)
                    if(playerIndex !== -1){
                        currentTeam.roster[playerIndex].stats.assistsBB++
                    }
                }else if(event.includes('made a block')){
                    const playerIndex = currentTeam.roster.findIndex((player) => player._id == playerId)
                    if(playerIndex !== -1){
                        currentTeam.roster[playerIndex].stats.blockBB++
                    }
                }else if(event.includes('stole the ball')){
                    const playerIndex = currentTeam.roster.findIndex((player) => player._id == playerId)
                    if(playerIndex !== -1){
                        currentTeam.roster[playerIndex].stats.stealBB++
                    }
                }
            })
            await currentTeam.save()
            res.status(200).json({msg: 'Stats updated'});
        } catch (error) {
            console.log(error)
        }
    },
    // Football
    updateFootballStats: async (req, res) => {
        const { gameStats } = req.body;
        const { teamId, eventId } = req.params;

        const currentTeam = await Team.findById({ _id: teamId });
        const eventIndex = currentTeam.schedule.findIndex((game) => game._id == eventId);
      
        const events = gameStats.map((item) => item.event);
        currentTeam.schedule[eventIndex].isComplete = true
        currentTeam.schedule[eventIndex].gameEvents = events;
      
        try {
          gameStats.forEach((stats) => {
            const { event, playerId } = stats;
      
            const playerIndex = currentTeam.roster.findIndex((player) => player._id == playerId);
      
            if (event.includes('scored a touchdown')) {
              if (playerIndex !== -1) {
                currentTeam.roster[playerIndex].stats.touchdownFB++;
              }
            } else if (event.includes('drilled the field goal')) {
              if (playerIndex !== -1) {
                currentTeam.roster[playerIndex].stats.fieldgoalFB++;
              }
            } else if (event.includes('completed the PAT')) {
              if (playerIndex !== -1) {
                currentTeam.roster[playerIndex].stats.patFB++;
              }
            } else if (event.includes('scored a 2 point conversion')) {
              if (playerIndex !== -1) {
                currentTeam.roster[playerIndex].stats.twoPointConversionFB++;
              }
            } else if (event.includes('scored a safety')) {
              if (playerIndex !== -1) {
                currentTeam.roster[playerIndex].stats.safetyFB++;
              }
            } else if (event.includes('threw for a touchdown')) {
              if (playerIndex !== -1) {
                currentTeam.roster[playerIndex].stats.tdPassFB++;
              }
            } else if (event.includes('intercepted the ball')) {
              if (playerIndex !== -1) {
                currentTeam.roster[playerIndex].stats.interceptionFB++;
              }
            } else if (event.includes('made a tackle')) {
              if (playerIndex !== -1) {
                currentTeam.roster[playerIndex].stats.tackleFB++;
              }
            } else if (event.includes('made the sack')) {
              if (playerIndex !== -1) {
                currentTeam.roster[playerIndex].stats.sackFB++;
              }
            }
          });
      
          await currentTeam.save();
          res.status(200).json({ msg: 'Stats updated' });
        } catch (error) {
          console.log(error);
        }
      },
    // Soccer
    updateSoccerStats: async (req, res) => {
      const {gameStats} = req.body
      const {teamId, eventId} = req.params

      const currentTeam = await Team.findById({_id: teamId})
      const eventIndex = currentTeam.schedule.findIndex((game)=> game._id == eventId)

      currentTeam.schedule[eventIndex].isComplete = true
      const events = gameStats.map((item)=> (item.event))
      currentTeam.schedule[eventIndex].gameEvents = events

      try {
       gameStats.forEach((stat)=>{
          const {event, playerId} = stat
          if(event.includes('scored a goal')){
              const playerIndex = currentTeam.roster.findIndex((player)=> player._id == playerId)
              if(playerIndex !== -1){
                  currentTeam.roster[playerIndex].stats.goalsSoccer++
              }
          }else if(event.includes('assisted on a goal')){
              const playerIndex = currentTeam.roster.findIndex((player)=> player._id == playerId)
              if(playerIndex !== -1){
                  currentTeam.roster[playerIndex].stats.assistsSoccer++
              }
          }else if(event.includes('missed a shot')){
              const playerIndex = currentTeam.roster.findIndex((player)=> player._id == playerId)
              if(playerIndex !== -1){
                  currentTeam.roster[playerIndex].stats.missedShotsSoccer++
              }
          }else if(event.includes('made a save')){
              const playerIndex = currentTeam.roster.findIndex((player)=> player._id == playerId)
              if(playerIndex !== -1){
                  currentTeam.roster[playerIndex].stats.savesSoccer++
              }
          }
       })
       await currentTeam.save();
       res.status(200).json({msg: 'Stats updated'});
      } catch (error) {
       console.log(error)
      }
    },
    // Volleyball
    updateVolleyballStats: async (req, res) => {
      const {gameStats} = req.body
      const {teamId, eventId} = req.params

      const currentTeam = await Team.findById({_id: teamId})
      const eventIndex = currentTeam.schedule.findIndex((game)=> game._id == eventId)

      currentTeam.schedule[eventIndex].isComplete = true
      const events = gameStats.map((item)=>item.event)
      currentTeam.schedule[eventIndex].gameEvents = events

      try {
        gameStats.forEach((stat)=>{
          const {event, playerId} = stat
          if(event.includes('served the ball!')){
            const playerIndex = currentTeam.roster.findIndex((player)=>player._id == playerId)
            if(playerIndex !== -1){
              currentTeam.roster[playerIndex].stats.servesVB++
            }
          }else if(event.includes('scored a point')){
            const playerIndex = currentTeam.roster.findIndex((player) => player._id == playerId)
            if(playerIndex !== -1){
              currentTeam.roster[playerIndex].stats.pointsVB++
            }
          }
        })
        await currentTeam.save()
        res.status(200).json({msg: 'Stats updated'});
      } catch (error) {
        console.log(error)
      }
    },
    updateLacrosseStats: async (req, res) => {
      const {gameStats} = req.body
      const {teamId, eventId} = req.params

      const currentTeam = await Team.findById({_id: teamId})
      const eventIndex = currentTeam.schedule.findIndex((game)=> game._id == eventId)

      currentTeam.schedule[eventIndex].isComplete = true
      const events = gameStats.map((item)=> (item.event))
      currentTeam.schedule[eventIndex].gameEvents = events

      try {
       gameStats.forEach((stat)=>{
          const {event, playerId} = stat
          if(event.includes('scored a goal')){
              const playerIndex = currentTeam.roster.findIndex((player)=> player._id == playerId)
              if(playerIndex !== -1){
                  currentTeam.roster[playerIndex].stats.goalsLax++
              }
          }else if(event.includes('assisted on a goal')){
              const playerIndex = currentTeam.roster.findIndex((player)=> player._id == playerId)
              if(playerIndex !== -1){
                  currentTeam.roster[playerIndex].stats.assistsLax++
              }
          }else if(event.includes('missed a shot')){
              const playerIndex = currentTeam.roster.findIndex((player)=> player._id == playerId)
              if(playerIndex !== -1){
                  currentTeam.roster[playerIndex].stats.missedShotsLax++
              }
          }else if(event.includes('made a save')){
              const playerIndex = currentTeam.roster.findIndex((player)=> player._id == playerId)
              if(playerIndex !== -1){
                  currentTeam.roster[playerIndex].stats.savesLax++
              }
          }
       })
       await currentTeam.save();
       res.status(200).json({msg: 'Stats updated'});
      } catch (error) {
       console.log(error)
      }
    },
    updateSoftballBaseballStats: async (req, res) => {
      const {gameStats} = req.body
      const {teamId, eventId} = req.params

      const currentTeam = await Team.findById({_id: teamId})
      const eventIndex = currentTeam.schedule.findIndex((game)=> game._id == eventId)

      currentTeam.schedule[eventIndex].isComplete = true
      const events = gameStats.map((item)=> (item.event))
      currentTeam.schedule[eventIndex].gameEvents = events

      try {
        gameStats.forEach((stat) => {
          const {event, playerId} = stat
          if(event.includes('got a hit')){
            const playerIndex = currentTeam.roster.findIndex((player) => player._id == playerId)
            if(playerIndex !== -1){
              currentTeam.roster[playerIndex].stats.hitsBBSB++
              currentTeam.roster[playerIndex].stats.atBatsBBSB++
            }
          }else if(event.includes('threw a pitch')){
            const playerIndex = currentTeam.roster.findIndex((player) => player._id == playerId)
            if(playerIndex !== -1){
              currentTeam.roster[playerIndex].stats.pitchCountBBSB++
            }
          }else if(event.includes('was hit by a pitch')){
            const playerIndex = currentTeam.roster.findIndex((player) => player._id == playerId)
            if(playerIndex !== -1){
              currentTeam.roster[playerIndex].stats.HBP++
            }
          }else if(event.includes('fouled off the ball')){
            const playerIndex = currentTeam.roster.findIndex((player) => player._id == playerId)
            if(playerIndex !== -1){
              currentTeam.roster[playerIndex].stats.foulsBBSB++
            }
          }else if(event.includes('hit a homerun!')){
            const playerIndex = currentTeam.roster.findIndex((player) => player._id == playerId)
            if(playerIndex !== -1){
              currentTeam.roster[playerIndex].stats.homerunsBBSB++
              currentTeam.roster[playerIndex].stats.atBatsBBSB++
            }
          }else if(event.includes('is out')){
            const playerIndex = currentTeam.roster.findIndex((player) => player._id == playerId)
            if(playerIndex !== -1){
              currentTeam.roster[playerIndex].stats.outsBBSB++
              currentTeam.roster[playerIndex].stats.atBatsBBSB++
            }
          }
        })
        await currentTeam.save()
        res.status(200).json({msg: 'Stats updated'})
      } catch (error) {
        console.log(error)
      }
  }
}

