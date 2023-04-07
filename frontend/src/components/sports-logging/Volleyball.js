import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import Spinner from '../Spinner'
import RosterModal from './RosterModal'
import {useNavigate} from 'react-router-dom'
import GameComplete from './GameComplete'

function Volleyball() {

    const {teamId, eventId} = useParams()
    const navigate = useNavigate();

    const [currentSet, setCurrentSet] = useState(1)
    const [myScore, setMyScore] = useState(0)
    const [opponentScore, setOpponentScore] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [roster, setRoster] = useState([])
    const [scheduledEvent, setScheduledEvent] = useState([])
    const [gameStats, setGameStats] = useState([])
    const [isActive, setIsActive] = useState(false)
    const [serveModal, setServeModal] = useState(false)
    const [pointModal, setPointModal] = useState(false)
    const [myWins, setMyWins] = useState(0)
    const [opponentWins, setOpponentWins] = useState(0)

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

    // Use effect to track the best of 5
    useEffect(()=>{
        if(myWins === 3){
            endGame()
        }
        if(opponentWins === 3){
            endGame()
        }
    }, [myWins, opponentWins])

    const serveBall = () => {
        setIsActive(true)
        setServeModal(true)
    }

    const pointScored = () => {
        setIsActive(true)
        setPointModal(true)
    }

    const endSet = () => {
        if(myScore > opponentScore){
            setMyWins(myWins + 1)
            setMyScore(0)
            setOpponentScore(0)
            setGameStats([{event: `${roster[0].team} won Set ${currentSet}`}, ...gameStats])
            setCurrentSet(currentSet + 1)
        }else if(opponentScore > myScore){
            setOpponentWins(opponentWins + 1)
            setMyScore(0)
            setOpponentScore(0)
            setGameStats([{event: `${scheduledEvent.opponent} won Set ${currentSet}`}, ...gameStats])
            setCurrentSet(currentSet + 1)
        }
    }

    const closeModal = () => {
        setIsActive(false)
        setServeModal(false)
        setPointModal(false)
    }

    const endGame = async () => {
        setGameStats([{event: `The game has ended.`}, ...gameStats])
        try {
            const response = await fetch(`http://localhost:2121/stats/updateVolleyballStats/${teamId}/event/${eventId}`, {
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
        serveModal={serveModal}
        pointModal={pointModal}
        ballServed={(name, playerId)=> {
            setIsActive(false)
            setGameStats([{playerId, event: `${name} served the ball!`}, ...gameStats])
            setServeModal(false)
        }}
        pointScored={(name, playerId)=>{
            setIsActive(false)
            setGameStats([{playerId, event: `${name} scored a point`}, ...gameStats])
            setMyScore(myScore + 1)
            setPointModal(false)
        }}
        />

        {isLoading ? <Spinner /> : (
            <div style={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
                <header className='logger-header'>
                    <div className='volleyball-set-tracker'>
                        {currentSet > 5 || opponentWins >= 3 || myWins >= 3 ? <span>Game Over</span> : <span>Set {currentSet}</span> }
                        <span className='set-info'>Best of 5</span>
                    </div>
                    <span className='logger-current-score'>{opponentScore} - {myScore}</span>
                    <div className='logger-scores'>
                      <div className='set-best-of-five'>
                        <span>{scheduledEvent.opponent}</span>
                        <span>{opponentWins} - {myWins}</span>
                      </div>
                      <div className='set-best-of-five'>
                        <span>{roster[0].team}</span>
                        <span>{myWins} - {opponentWins}</span>
                      </div>
                    </div>
                </header>
                <section style={{flexGrow: 1, backgroundColor: 'rgb(47, 47, 47)'}}>
                    <div className='opponent-goal'>
                        <button onClick={()=>{
                            setOpponentScore(opponentScore + 1)
                            setGameStats([{event: `${scheduledEvent.opponent} scored a point`}, ...gameStats])
                        }}>
                            {scheduledEvent.opponent} Point
                        </button>
                    </div>
                    <div className='team-scoring-container'>
                        <span className='hockey-my-team-name'>{roster[0].team}</span>
                        <div className='score-button-container volleyball-container'>
                            <div className='goal-scored'>
                                <button onClick={serveBall}>Serve</button>
                            </div>
                            <div className='goal-scored'>
                                <button onClick={pointScored}>Point</button>
                            </div>
                        </div>
                        <div className='next-period volleyball-btns'>
                            <button onClick={endSet}>End Set</button>
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

export default Volleyball