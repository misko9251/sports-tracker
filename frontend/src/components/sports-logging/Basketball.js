import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import Spinner from '../Spinner'
import RosterModal from './RosterModal'
import {useNavigate} from 'react-router-dom'
import GameComplete from './GameComplete'

function Basketball() {

    const {teamId, eventId} = useParams()
    console.log(eventId)
    // const navigate = useNavigate();

    const [currentQuarter, setCurrentQuarter] = useState(1)
    const [myScore, setMyScore] = useState(0)
    const [opponentScore, setOpponentScore] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [roster, setRoster] = useState([])
    const [scheduledEvent, setScheduledEvent] = useState([])
    const [gameStats, setGameStats] = useState([])
    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
        async function fetchData(){
            const responseRoster = await fetch(
                `http://localhost:2121/dashboard/getTeamInfo/${teamId}`,
                {credentials: 'include'}
            )
            const jsonRoster = await responseRoster.json()
            setRoster(jsonRoster.roster)
            console.log(jsonRoster)
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

    return (
        <>

        {scheduledEvent.isComplete && <GameComplete />}

        {/* <RosterModal 
        roster={roster}
        isActive={isActive}
        closeModal={closeModal}
        playerScored={(name, playerId)=>{
            setMyScore(myScore + 1)
            setGameStats([{playerId, event: `${name} scored a goal`}, ...gameStats])
            setIsActive(false)
            setGoalModal(false)
        }}
        playerAssist={async (name, playerId)=>{
            setGameStats([{playerId, event: `${name} assisted on a goal`}, ...gameStats])
            setIsActive(false)
            setAssistModal(false)
        }}
        playerMissedShot={async (name, playerId)=>{
            setGameStats([{playerId, event: `${name} missed a shot`}, ...gameStats])
            setIsActive(false)
            setShotMissedModal(false)
        }}
        playerMadeSave={async (name, playerId)=>{
            setGameStats([{playerId, event: `${name} made a save`}, ...gameStats])
            setIsActive(false)
            setSaveMade(false)
        }}
        goalModal={goalModal}
        assistModal={assistModal}
        shotMissedModal={shotMissedModal}
        saveMade={saveMade}
        /> */}

        {isLoading ? <Spinner /> : (
            <div style={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
                <header className='logger-header'>
                    <span className='logger-current-time'>Quarter {currentQuarter}</span>
                    <span className='logger-current-score'>{opponentScore} - {myScore}</span>
                    <div className='logger-scores'>
                      <span>{scheduledEvent.opponent}</span>
                      {roster.length > 0 && <span>{roster[0].team}</span>}
                    </div>
                </header>
                <section style={{flexGrow: 1, backgroundColor: 'rgb(47, 47, 47)'}}>
                    <div className='opponent-basket opponent-goal'>
                        <button onClick={()=>{
                            setOpponentScore(opponentScore + 1)
                            setGameStats([{event: `${scheduledEvent.opponent} scored a goal`}, ...gameStats])
                        }}>
                            {scheduledEvent.opponent} Free Throw Made
                        </button>
                        <button onClick={()=>{
                            setOpponentScore(opponentScore + 2)
                            setGameStats([{event: `${scheduledEvent.opponent} scored a goal`}, ...gameStats])
                        }}>
                            {scheduledEvent.opponent} 2 PT FG
                        </button>
                        <button onClick={()=>{
                            setOpponentScore(opponentScore + 3)
                            setGameStats([{event: `${scheduledEvent.opponent} scored a goal`}, ...gameStats])
                        }}>
                            {scheduledEvent.opponent} 3 PT FG
                        </button>
                    </div>
                    <div className='team-scoring-container'>
                        <span className='hockey-my-team-name'>{roster[0].team}</span>
                        <div className='score-button-container'>
                            <div className='basketball-pts-made'>
                                <div className='goal-scored'>
                                    <button onClick=''>2 PT FG</button>
                                </div>
                                <div className='shot-missed'>
                                    <button onClick=''>2 PT MISS</button>
                                </div>
                            </div>
                            <div className='basketball-other-stats-container'>
                                <button className='free-throw-made' onClick=''>Free Throw Made</button>
                                <div className='basketball-stats'>
                                    <button>REB</button>
                                    <button>AST</button>
                                </div>
                                <div className='basketball-stats'>
                                    <button>BLK</button>
                                    <button>STL</button>
                                </div>
                            </div>
                            <div className='basketball-pts-made'>
                                <div className='goal-scored'>
                                    <button onClick=''>3 PT FG</button>
                                </div>
                                <div className='shot-missed'>
                                    <button onClick=''>3 PT MISS</button>
                                </div>
                            </div>
                        </div>
                        <div className=''>
                            {/* {currentPeriod < 3 && <button onClick=''>End Period</button>}
                            {currentPeriod >= 3 && <button onClick=''>End Game</button>} */}
                        </div>
                    </div>
                    <section className='play-by-play'>
                        <h3>Play by Play</h3>
                        <div>
                            {/* {playByPlay} */}
                        </div>
                    </section>
                </section>
            </div>
        )}
        </>
    )
}

export default Basketball