import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import Spinner from '../Spinner'
import RosterModal from './RosterModal'
import {useNavigate} from 'react-router-dom'
import GameComplete from './GameComplete'

function BaseballSoftball() {

    const {teamId, eventId} = useParams()
    const navigate = useNavigate();

    const [currentHalf, setCurrentHalf] = useState(1)
    const [myScore, setMyScore] = useState(0)
    const [opponentScore, setOpponentScore] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [roster, setRoster] = useState([])
    const [scheduledEvent, setScheduledEvent] = useState([])
    const [gameStats, setGameStats] = useState([])
    const [isActive, setIsActive] = useState(false)
    console.log(scheduledEvent.isComplete)

    useEffect(() => {
        async function fetchData(){
            const responseRoster = await fetch(
                `http://localhost:2121/dashboard/getTeamInfo/${teamId}`,
                {credentials: 'include'}
            )
            const jsonRoster = await responseRoster.json()
            setRoster(jsonRoster.roster)
            const responseEvent = await fetch(
                `http://localhost:2121/dashboard/team/${teamId}/getScheduledEvent/${eventId}`,
                {credentials: 'include'}
            )
            const jsonEvent = await responseEvent.json()
            setScheduledEvent(jsonEvent.scheduledEvent)
            setIsLoading(false)
        }
        fetchData()
    }, [])



    const closeModal = () => {
        setIsActive(false)
    }

    const endGame = async () => {
        setGameStats([{event: `The game has concluded.`}, ...gameStats])
        try {
            const response = await fetch(`http://localhost:2121/stats/updateSoccerStats/${teamId}/event/${eventId}`, {
                credentials: 'include',
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({gameStats})
            })
            const json = await response.json()
            navigate(`/dashboard/${teamId}`);
        } catch (error) {
            console.log(error)
        }
    }

    const playByPlay = gameStats.map((event)=>(<div className='play-by-play-update'>{event.event}</div>))
    

    return (
        <>

        {scheduledEvent.isComplete && <GameComplete />}

        <RosterModal 
        roster={roster}
        isActive={isActive}
        closeModal={closeModal}
        />

        {isLoading ? <Spinner /> : (
            <div style={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
                <header className='logger-header'>
                    <span className='logger-current-time'>Inning {currentHalf}</span>
                    <span className='logger-current-score'>{opponentScore} - {myScore}</span>
                    <div className='logger-scores'>
                      <span>{scheduledEvent.opponent}</span>
                      <span>{roster[0].team}</span>
                    </div>
                </header>
                <section style={{flexGrow: 1, backgroundColor: 'rgb(47, 47, 47)'}}>
                    <div className='opponent-goal'>
                        <button onClick={()=>{
                            setOpponentScore(opponentScore + 1)
                            setGameStats([{event: `${scheduledEvent.opponent} scored a run`}, ...gameStats])
                        }}>
                            {scheduledEvent.opponent} Run Scored
                        </button>
                    </div>
                    <div className='team-scoring-container'>
                        <span className='hockey-my-team-name'>{roster[0].team}</span>
                        <div className='score-button-container'>
                            <div className='goal-scored'>
                                <button onClick=''>Hit</button>
                            </div>
                            <div className='save-assist-container'>
                                <button onClick=''>Pitch</button>
                                <button onClick=''>Hit by Pitch</button>
                                <button onClick=''>Foul Ball</button>
                                <button onClick=''>Homerun</button>
                            </div>
                            <div className='shot-missed'>
                                <button onClick=''>Out</button>
                            </div>
                        </div>
                        <div className='next-period'>
                            {currentHalf < 2 && <button onClick=''>End Inning</button>}
                            {currentHalf >= 2 && <button onClick=''>End Game</button>}
                        </div>
                    </div>
                    <section className='play-by-play'>
                        <h3>Play by Play</h3>
                        <div>
                            {playByPlay}
                        </div>
                    </section>
                </section>
            </div>
        )}
        </>
    )
}

export default BaseballSoftball
