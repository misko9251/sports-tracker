import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import Spinner from '../Spinner'
import RosterModal from './RosterModal'

function Hockey() {

    const {teamId, eventId} = useParams()

    const [currentPeriod, serCurrentPeriod] = useState(1)
    const [myScore, setMyScore] = useState(0)
    const [opponentScore, setOpponentScore] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [roster, setRoster] = useState([])
    const [scheduledEvent, setScheduledEvent] = useState([])
    const [gameStats, setGameStats] = useState([])
    const [isActive, setIsActive] = useState(false)
    // const [openModal, setOpenModal] = useState(false)
    const [goalModal, setGoalModal] = useState(false)
    const [assistModal, setAssistModal] = useState(false)
    const [shotMissedModal, setShotMissedModal] = useState(false)
    const [saveMade, setSaveMade] = useState(false)
    

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

    const goalScored = () => {
        setGoalModal(true)
        setIsActive(true)
    }

    const logAssist = () => {
        setAssistModal(true)
        setIsActive(true)
    }

    const shotMissed = () => {
        setShotMissedModal(true)
        setIsActive(true)
    }

    const playerSaveMade = () => {
        setSaveMade(true)
        setIsActive(true)
    }

    const endPeriod = () => {
        setGameStats([`Period ${currentPeriod} has ended.`, ...gameStats])
        serCurrentPeriod((prevVal)=> prevVal+1)
    }

    const closeModal = () => {
        setIsActive(false)
        setGoalModal(false)
        setAssistModal(false)
        setShotMissedModal(false)
    }

    const playByPlay = gameStats.map((event)=>(<div className='play-by-play-update'>{event}</div>))
    

    return (
        <>

        <RosterModal 
        roster={roster}
        isActive={isActive}
        closeModal={closeModal}
        playerScored={(name)=>{
            setMyScore(myScore + 1)
            setGameStats([`${name} scored a goal`, ...gameStats])
            setIsActive(false)
            setGoalModal(false)
        }}
        playerAssist={(name)=>{
            setGameStats([`${name} assisted on a goal`, ...gameStats])
            setIsActive(false)
            setAssistModal(false)
        }}
        playerMissedShot={(name)=>{
            setGameStats([`${name} missed a shot`, ...gameStats])
            setIsActive(false)
            setShotMissedModal(false)
        }}
        playerMadeSave={(name)=>{
            setGameStats([`${name} made a save`])
            setIsActive(false)
            setSaveMade(false)
        }}
        goalModal={goalModal}
        assistModal={assistModal}
        shotMissedModal={shotMissedModal}
        saveMade={saveMade}
        />


        {isLoading ? <Spinner /> : (
            <div style={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
                <header className='logger-header'>
                    <span className='logger-current-time'>Period {currentPeriod}</span>
                    <div className='logger-scores'>
                      <span>{scheduledEvent.opponent}</span>
                      <span className='logger-current-score'>{opponentScore} - {myScore}</span>
                      <span>{roster[0].team}</span>
                    </div>
                </header>
                <section style={{flexGrow: 1, backgroundColor: 'rgb(47, 47, 47)'}}>
                    <div className='opponent-goal'>
                        <button onClick={()=>{
                            setOpponentScore(opponentScore + 1)
                            setGameStats([`${scheduledEvent.opponent} scored a goal`, ...gameStats])
                        }}>
                            {scheduledEvent.opponent} Goal
                        </button>
                    </div>
                    <div className='team-scoring-container'>
                        <span className='hockey-my-team-name'>{roster[0].team}</span>
                        <div className='score-button-container'>
                            <div className='goal-scored'>
                                <button onClick={goalScored}>Goal</button>
                            </div>
                            <div className='save-assist-container'>
                                <button onClick={playerSaveMade}>Save</button>
                                <button onClick={logAssist}>Assist</button>
                            </div>
                            <div className='shot-missed'>
                                <button onClick={shotMissed}>Shot Missed</button>
                            </div>
                        </div>
                        <div className='next-period'>
                            <button onClick={endPeriod}>End Period</button>
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

export default Hockey