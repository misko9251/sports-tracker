import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import TabSpinner from './TabSpinner'

function PlayerStats() {
    
    const {teamId, playerId} = useParams()
    const [currentPlayer, setCurrentPlayer] = useState([])
    const [isLoading, setisLoading] = useState(true)
    const [sport, setSport] = useState('')

    useEffect(()=> {
        async function fetchData(){
            const response = await fetch(
                `http://localhost:2121/dashboard/team/${teamId}/player/${playerId}/getPlayer`,
                {credentials: 'include'}
            )
            const json = await response.json()
            setSport(json.sportType)
            setCurrentPlayer(json.player)
            setisLoading(false)
        }
        fetchData()
      }, [])
      
      function getStats() {
        const stats = currentPlayer.stats
        if (sport === 'Hockey') {
          // return only hockey stats
          return {
            goals: stats.goals,
            assists: stats.assists,
            points: stats.goals + stats.assists,
            saves: stats.saves,
            missedShots: stats.missedShots,
          }
        } else if (sport === 'Basketball') {
          // return basketball stats plus hockey stats
          return {
            points: stats.pointsBB,
            assists: stats.assistsBB,
            rebounds: stats.reboundsBB,
            blocks: stats.blockBB,
            steals: stats.stealBB,
            freeThrows: stats.freeThrowsBB
          }
        } else if (sport === 'Football') {
          return {
            touchdowns: stats.touchdownFB,
            fieldGoals: stats.fieldgoalFB,
            extraPoints: stats.patFB,
            twoPointConversions: stats.twoPointConversionFB,
            safeties: stats.safetyFB,
            touchdownPasses: stats.tdPassFB,
            interceptions: stats.interceptionFB,
            tackles: stats.tackleFB,
            sacks: stats.sackFB
          }
        }else if (sport === 'Soccer'){
          return {
            goals: stats.goalsSoccer,
            assists: stats.assistsSoccer,
            points: stats.goalsSoccer + stats.assistsSoccer,
            missedShots: stats.missedShotsSoccer,
            saves: stats.savesSoccer,
          }
        }else if(sport === 'Volleyball'){
          return{
            serves: stats.servesVB,
            points: stats.pointsVB
          }
        }else {
          return {}
        }
      }
    
    return (
        <>
        {isLoading ? <TabSpinner /> : (
            <section className='player-stats-container'>
                <div className='player-stats'>
                    <h3>Statistics Summary</h3>
                    <table>
                        <thead>
                          <tr>
                            <th>Stat</th>
                            <th>Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.entries(getStats()).map(([key, value]) => (
                            <tr key={key}>
                              <td>{key[0].toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1")}</td>
                              <td>{value}</td>
                            </tr>
                          ))}
                        </tbody>
                    </table>
                </div>
            </section>
        )}
        </>
    )
}

export default PlayerStats