import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import TabSpinner from './TabSpinner'

function TeamStats() {

    const {teamId} = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [completedGames, setCompletedGames] = useState([])
    const [selectedStats, setSelectedStats] = useState([])
    const [showEvents, setShowEvents] = useState(true);
    
    useEffect(()=>{
        async function fetchData(){
            const response = await fetch(`http://localhost:2121/dashboard/getPastGames/${teamId}`, {
                credentials: 'include'
            })
            const json = await response.json()
            setCompletedGames(json.completedGames)
            setIsLoading(false)
        }
        fetchData()
    }, [completedGames])

    const handleClick = (event) => {
        setSelectedStats(event.gameEvents)
        setShowEvents(false)
      };

    const events = completedGames.map((event)=>{
        return (
            <div onClick={()=>handleClick(event)}className='individual-events completed-game'>
                <h2>Opponent: {event.opponent}</h2>
                <span>Result: {event.myScore > event.opponentScore ? 'Win' : 'Loss'}</span>
            </div>
        )
    })

    const gameData = selectedStats.map((game)=>{
        return (
            <div className='individual-events game-data'>
                <span>{game}</span>
            </div>
        )
    })

    return (
      <>
        {isLoading ? <TabSpinner /> : 
        events.length == 0 ? (
            <section className='no-data-added-container dashboard-tabs'>
                <h4>No Games Logged</h4>
            </section>    
        ) : 
        <section className='team-tab final-game-stats-container'>
            {showEvents ? events : (
                <>
                    <div className='game-stats-header'>
                        <h1>Game Highlights</h1>
                        <button onClick={()=>setShowEvents(!showEvents)}>BACK</button>
                    </div>
                    <div className='individual-events game-data'>
                        <span>The game has ended.</span>
                    </div>
                    {gameData}
                    <div className='individual-events game-data'>
                        <span>The game has started.</span>
                    </div>
                </>
            )}
        </section>
        }
      </>
    )
}

export default TeamStats