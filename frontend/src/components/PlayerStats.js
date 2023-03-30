import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import TabSpinner from './TabSpinner'

function PlayerStats() {
    
    const {teamId, playerId} = useParams()
    const [currentPlayer, setCurrentPlayer] = useState([])
    const [isLoading, setisLoading] = useState(true)

    useEffect(()=> {
        async function fetchData(){
            const response = await fetch(
                `http://localhost:2121/dashboard/team/${teamId}/player/${playerId}/getPlayer`,
                {credentials: 'include'}
            )
            const json = await response.json()
            setCurrentPlayer(json.player)
            setisLoading(false)
        }
        fetchData()
      }, [])

      console.log(currentPlayer.stats)
    
    
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
                          {Object.entries(currentPlayer.stats).map(([key, value]) => (
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