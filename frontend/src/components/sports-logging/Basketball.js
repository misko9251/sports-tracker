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
    const [twoPointsModal, setTwoPointsModal] = useState(false)
    const [twoPointsMissedModal, setTwoPointsMissedModal] = useState(false)
    const [threePointsModal, setThreePointsModal] = useState(false)
    const [threePointsMissedModal, setThreePointsMissedModal] = useState(false)
    const [freeThrowMadeModal, setFreeThrowMadeModal] = useState(false)
    const [reboundModal, setReboundModal] = useState(false)
    const [assistBasketballModal, setAssistBasketballModal] = useState(false)
    const [blockModal, setBlockModal] = useState(false)
    const [stealModal, setStealModal] = useState(false)

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

    const twoPointsScored = () => {
        setIsActive(true)
        setTwoPointsModal(true)
    }

    const twoPointsMissed = () => {
        setIsActive(true)
        setTwoPointsMissedModal(true)
    }

    const threePointsScored = () => {
        setIsActive(true)
        setThreePointsModal(true)
    }

    const threePointsMissed = () => {
        setIsActive(true)
        setThreePointsMissedModal(true)
    }

    const freeThrowMade = () => {
        setIsActive(true)
        setFreeThrowMadeModal(true)
    }

    const reboundMade = () => {
        setIsActive(true)
        setReboundModal(true)
    }

    const assistMade = () => {
        setIsActive(true)
        setAssistBasketballModal(true)
    }

    const blockMade = () => {
        setIsActive(true)
        setBlockModal(true)
    }

    const stealMade = () => {
        setIsActive(true)
        setStealModal(true)
    }

    const closeModal = () => {
        setIsActive(false)
        setTwoPointsMissedModal(false)
        setTwoPointsModal(false)
        setFreeThrowMadeModal(false)
        setReboundModal(false)
        setAssistBasketballModal(false)
        setBlockModal(false)
        setStealModal(false)
        setThreePointsMissedModal(false)
        setThreePointsModal(false)
    }

    const playByPlay = gameStats.map((event)=>(<div className='play-by-play-update'>{event.event}</div>))

    return (
        <>

        {scheduledEvent.isComplete && <GameComplete />}

        <RosterModal 
        roster={roster}
        isActive={isActive}
        closeModal={closeModal}
        twoPointsModal={twoPointsModal}
        twoPointsMissedModal={twoPointsMissedModal}
        threePointsModal={threePointsModal}
        threePointsMissedModal={threePointsMissedModal}
        freeThrowMadeModal={freeThrowMadeModal}
        reboundModal={reboundModal}
        assistBasketballModal={assistBasketballModal}
        blockModal={blockModal}
        stealModal={stealModal}
        twoPointsScored={(playerName, playerId)=>{
            setMyScore(myScore + 2)
            setGameStats([{playerId, event: `${playerName} scored 2 points`}, ...gameStats])
            setIsActive(false)
            setTwoPointsModal(false)
        }}
        missedTwoPoints={(playerName, playerId)=>{
            setGameStats([{playerId, event: `${playerName} missed a 2 PT FG`}, ...gameStats])
            setIsActive(false)
            setTwoPointsMissedModal(false)
        }}
        freeThrowMade={(playerName, playerId)=>{
            setGameStats([{playerId, event: `${playerName} made a free throw`}, ...gameStats])
            setIsActive(false)
            setFreeThrowMadeModal(false)
        }}
        reboundMade={(playerName, playerId)=>{
            setGameStats([{playerId, event: `${playerName} got the rebound`}, ...gameStats])
            setIsActive(false)
            setReboundModal(false)
        }}
        assistMade={(playerName, playerId)=>{
            setGameStats([{playerId, event: `${playerName} got the assist`}, ...gameStats])
            setIsActive(false)
            setAssistBasketballModal(false)
        }}
        blockMade={(playerName, playerId)=>{
            setGameStats([{playerId, event: `${playerName} made a block`}, ...gameStats])
            setIsActive(false)
            setBlockModal(false)
        }}
        stealMade={(playerName, playerId)=>{
            setGameStats([{playerId, event: `${playerName} stole the ball`}, ...gameStats])
            setIsActive(false)
            setStealModal(false)
        }}
        threePointsScored={(playerName, playerId)=> {
            setMyScore(myScore + 3)
            setGameStats([{playerId, event: `${playerName} scored 3 points`}, ...gameStats])
            setIsActive(false)
            setThreePointsModal(false)
        }}
        missedThreePoints={(playerName, playerId)=> {
            setGameStats([{playerId, event: `${playerName} missed a 3 PT FG`}, ...gameStats])
            setIsActive(false)
            setThreePointsMissedModal(false)
        }}
        />


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
                            setGameStats([{event: `${scheduledEvent.opponent} scored a free throw.`}, ...gameStats])
                        }}>
                            {scheduledEvent.opponent} Free Throw Made
                        </button>
                        <button onClick={()=>{
                            setOpponentScore(opponentScore + 2)
                            setGameStats([{event: `${scheduledEvent.opponent} scored 2 points.`}, ...gameStats])
                        }}>
                            {scheduledEvent.opponent} 2 PT FG
                        </button>
                        <button onClick={()=>{
                            setOpponentScore(opponentScore + 3)
                            setGameStats([{event: `${scheduledEvent.opponent} scored 3 points.`}, ...gameStats])
                        }}>
                            {scheduledEvent.opponent} 3 PT FG
                        </button>
                    </div>
                    <div className='team-scoring-container'>
                        <span className='hockey-my-team-name'>{roster[0].team}</span>
                        <div className='score-button-container'>
                            <div className='basketball-pts-made'>
                                <div className='goal-scored'>
                                    <button onClick={twoPointsScored}>2 PT FG</button>
                                </div>
                                <div className='shot-missed'>
                                    <button onClick={twoPointsMissed}>2 PT MISS</button>
                                </div>
                            </div>
                            <div className='basketball-other-stats-container'>
                                <button className='free-throw-made' onClick={freeThrowMade}>Free Throw Made</button>
                                <div className='basketball-stats'>
                                    <button onClick={reboundMade}>REB</button>
                                    <button onClick={assistMade}>AST</button>
                                </div>
                                <div className='basketball-stats'>
                                    <button onClick={blockMade}>BLK</button>
                                    <button onClick={stealMade}>STL</button>
                                </div>
                            </div>
                            <div className='basketball-pts-made'>
                                <div className='goal-scored'>
                                    <button onClick={threePointsScored}>3 PT FG</button>
                                </div>
                                <div className='shot-missed'>
                                    <button onClick={threePointsMissed}>3 PT MISS</button>
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
                            {playByPlay}
                        </div>
                    </section>
                </section>
            </div>
        )}
        </>
    )
}

export default Basketball