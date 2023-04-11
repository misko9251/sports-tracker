import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import Spinner from '../Spinner'
import RosterModal from './RosterModal'
import {useNavigate} from 'react-router-dom'
import GameComplete from './GameComplete'

function BaseballSoftball() {

    const {teamId, eventId} = useParams()
    const navigate = useNavigate();

    const [currentInning, setCurrentInning] = useState(1)
    const [myScore, setMyScore] = useState(0)
    const [opponentScore, setOpponentScore] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [roster, setRoster] = useState([])
    const [scheduledEvent, setScheduledEvent] = useState([])
    const [gameStats, setGameStats] = useState([])
    const [isActive, setIsActive] = useState(false)
    const [ballHitModal, setBallHitModal] = useState(false)
    const [pitchModal, setPitchModal] = useState(false)
    const [hitByPitchModal, setHitByPitchModal] = useState(false)
    const [foulBallModal, setFoulBallModal] = useState(false)
    const [homerunModal, setHomerunModal] = useState(false)
    const [playerOutModal, setPlayerOutModal] = useState(false)

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

    const ballHit = () => {
        setIsActive(true)
        setBallHitModal(true)
    }

    const pitch = () => {
        setIsActive(true)
        setPitchModal(true)
    }

    const hitByPitch = () => {
        setIsActive(true)
        setHitByPitchModal(true)
    }

    const foulBall = () => {
        setIsActive(true)
        setFoulBallModal(true)
    }

    const homerun = () => {
        setIsActive(true)
        setHomerunModal(true)
    }

    const playerOut = () => {
        setIsActive(true)
        setPlayerOutModal(true)
    }

    const closeModal = () => {
        setIsActive(false)
        setBallHitModal(false)
        setPitchModal(false)
        setHitByPitchModal(false)
        setFoulBallModal(false)
        setHomerunModal(false)
        setPlayerOutModal(false)
    }

    const endGame = async () => {
        setGameStats([{event: `The game has concluded.`}, ...gameStats])
        try {
            const response = await fetch(`http://localhost:2121/stats/updateSoftballBaseballStats/${teamId}/event/${eventId}`, {
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
        ballHitModal={ballHitModal}
        pitchModal={pitchModal}
        hitByPitchModal={hitByPitchModal}
        foulBallModal={foulBallModal}
        homerunModal={homerunModal}
        playerOutModal={playerOutModal}
        ballHit={(name, playerId)=>{
            setGameStats([{playerId, event: `${name} got a hit!`}, ...gameStats])
            setIsActive(false)
            setBallHitModal(false)
        }}
        pitchMade={(name, playerId)=>{
            setGameStats([{playerId, event: `${name} threw a pitch`}, ...gameStats])
            setIsActive(false)
            setPitchModal(false)
        }}
        hitByPitch={(name, playerId)=>{
            setGameStats([{playerId, event: `${name} was hit by a pitch`}, ...gameStats])
            setIsActive(false)
            setHitByPitchModal(false)
        }}
        foulBall={(name, playerId)=>{
            setGameStats([{playerId, event: `${name} fouled off the ball`}, ...gameStats])
            setIsActive(false)
            setFoulBallModal(false)
        }}
        homerun={(name, playerId)=>{
            setGameStats([{playerId, event: `${name} hit a homerun!`}, ...gameStats])
            setIsActive(false)
            setHomerunModal(false)
        }}
        out={(name, playerId)=>{
            setGameStats([{playerId, event: `${name} is out`}, ...gameStats])
            setIsActive(false)
            setPlayerOutModal(false)
        }}
        />

        {isLoading ? <Spinner /> : (
            <div style={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
                <header className='logger-header'>
                    <span className='logger-current-time'>Inning {currentInning}</span>
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
                        <div className='score-button-container baseball-btn-container'>
                            <div className='goal-scored hit-out-btn'>
                                <button onClick={ballHit}>Hit</button>
                            </div>
                            <div className='baseball-stats'>
                                <button onClick={pitch}>Pitch</button>
                                <button onClick={hitByPitch}>Hit by Pitch</button>
                            </div>
                            <div className='baseball-stats'>
                                <button onClick={foulBall}>Foul Ball</button>
                                <button onClick={homerun}>Homerun</button>
                            </div>
                            <div className='shot-missed hit-out-btn'>
                                <button onClick={playerOut}>Out</button>
                            </div>
                        </div>
                        <div className='next-period'>
                            {currentInning < 9 && <button onClick={()=>setCurrentInning(currentInning+1)}>End Inning</button>}
                            {currentInning >= 9 && <button onClick={endGame}>End Game</button>}
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
