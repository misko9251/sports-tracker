import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import Spinner from '../Spinner'
import RosterModal from './RosterModal'
import {useNavigate} from 'react-router-dom'
import GameComplete from './GameComplete'
import EmptyRoster from './EmptyRoster'

function Football() {

    const {teamId, eventId} = useParams()
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true)
    const [currentQuarter, setCurrentQuarter] = useState(1)
    const [opponentScore, setOpponentScore] = useState(0)
    const [myScore, setMyScore] = useState(0)
    const [roster, setRoster] = useState([])
    const [scheduledEvent, setScheduledEvent] = useState([])
    const [gameStats, setGameStats] = useState([])
    const [isActive, setIsActive] = useState(false)
    const [touchdownModal, setTouchdownModal] = useState(false)
    const [fieldgoalModal, setFieldgoalModal] = useState(false)
    const [extraPointModal, setExtraPointModal] = useState(false)
    const [twoPointConversationModal, setTwoPointConversationModal] = useState(false)
    const [safetyScoredModal, setSafetyScoredModal] = useState(false)
    const [tdPassModal, setTdPassModal] = useState(false)
    const [passInterceptedModal, setPassInterceptedModal] = useState(false)
    const [tackleMadeModal, setTackleMadeModal] = useState(false)
    const [sackMadeModal, setSackMadeModal] = useState(false)

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

  const touchdownScored = () => {
    setIsActive(true)
    setTouchdownModal(true)
  }

  const fieldgoalScored = () => {
    setIsActive(true)
    setFieldgoalModal(true)
  }

  const extraPoint = () => {
    setIsActive(true)
    setExtraPointModal(true)
  }

  const twoPointConversion = () => {
    setIsActive(true)
    setTwoPointConversationModal(true)
  }

  const safetyScored = () => {
    setIsActive(true)
    setSafetyScoredModal(true)
  }

  const tdPass = () => {
    setIsActive(true)
    setTdPassModal(true)
  }

  const passIntercepted = () => {
    setIsActive(true)
    setPassInterceptedModal(true)
  }

  const tackleMade = () => {
    setIsActive(true)
    setTackleMadeModal(true)
  }

  const sackMade = () => {
    setIsActive(true)
    setSackMadeModal(true)
  }

  const closeModal = () => {
    setIsActive(false)
    setTouchdownModal(false)
    setFieldgoalModal(false)
    setExtraPointModal(false)
    setTwoPointConversationModal(false)
    setSafetyScoredModal(false)
    setTdPassModal(false)
    setPassInterceptedModal(false)
    setTackleMadeModal(false)
    setSackMadeModal(false)
}

const endQuarter = () => {
    setGameStats([{event: `Quarter ${currentQuarter} has ended.`}, ...gameStats])
    setCurrentQuarter(currentQuarter+1)
}

const endGame = async () => {
    setGameStats([{event: `Quarter 4 has ended.`}, ...gameStats])
    try {
        const response = await fetch(`http://localhost:2121/stats/updateFootballStats/${teamId}/event/${eventId}`,{
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({gameStats, myScore, opponentScore})
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
      touchdownModal={touchdownModal}
      fieldgoalModal={fieldgoalModal}
      extraPointModal={extraPointModal}
      twoPointConversationModal={twoPointConversationModal}
      safetyScoredModal={safetyScoredModal}
      tdPassModal={tdPassModal}
      passInterceptedModal={passInterceptedModal}
      tackleMadeModal={tackleMadeModal}
      sackMadeModal={sackMadeModal}
      touchdownScored={(name, playerId)=>{
        setMyScore(myScore + 6)
        setGameStats([{playerId, event: `${name} scored a touchdown`}, ...gameStats])
        setIsActive(false)
        setTouchdownModal(false)
      }}
      fieldGoalMade={(name, playerId)=>{
        setMyScore(myScore + 3)
        setGameStats([{playerId, event: `${name} drilled the field goal`}, ...gameStats])
        setIsActive(false)
        setFieldgoalModal(false)
      }}
      patMade={(name, playerId)=>{
        setMyScore(myScore + 1)
        setGameStats([{playerId, event: `${name} completed the PAT`}, ...gameStats])
        setIsActive(false)
        setExtraPointModal(false)
      }}
      twoPtConversion={(name, playerId)=>{
        setMyScore(myScore + 2)
        setGameStats([{playerId, event: `${name} scored a 2 point conversion`}, ...gameStats])
        setIsActive(false)
        setTwoPointConversationModal(false)
      }}
      safetyScored={(name, playerId)=>{
        setMyScore(myScore + 2)
        setGameStats([{playerId, event: `${name} scored a safety`}, ...gameStats])
        setIsActive(false)
        setSafetyScoredModal(false)
      }}
      tdPassMade={(name, playerId)=>{
        setGameStats([{playerId, event: `${name} threw for a touchdown`}, ...gameStats])
        setIsActive(false)
        setTdPassModal(false)
      }}
      passIntercepted={(name, playerId)=>{
        setGameStats([{playerId, event: `${name} intercepted the ball`}, ...gameStats])
        setIsActive(false)
        setPassInterceptedModal(false)
      }}
      tackleMade={(name, playerId)=>{
        setGameStats([{playerId, event: `${name} made a tackle`}, ...gameStats])
        setIsActive(false)
        setTackleMadeModal(false)
      }}
      sackMade={(name, playerId)=>{
        setGameStats([{playerId, event: `${name} made the sack`}, ...gameStats])
        setIsActive(false)
        setSackMadeModal(false)
      }}
      />


      {isLoading ? <Spinner /> : 
      roster.length == 0 ? <EmptyRoster /> : (
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
                  <div className='opponent-basket opponent-football'>
                    <div className='opponent-fb-stats'>
                        <div className='td-fg-container'>
                            <button onClick={()=>setOpponentScore(opponentScore + 6)}>
                                  {scheduledEvent.opponent} Touchdown
                              </button>
                              <button onClick={()=>setOpponentScore(opponentScore + 3)}>
                                  {scheduledEvent.opponent} Field Goal
                            </button>
                        </div>
                        <div className='other-fb-scores'>
                            <button onClick={()=>setOpponentScore(opponentScore + 1)}>
                                  {scheduledEvent.opponent} PAT
                              </button>
                              <button onClick={()=>setOpponentScore(opponentScore + 2)}>
                                  {scheduledEvent.opponent} 2 PT Conversion
                              </button>
                              <button onClick={()=>setOpponentScore(opponentScore + 2)}>
                                  {scheduledEvent.opponent} Safety
                            </button>
                        </div>
                    </div>
                  </div>
                  <div className='team-scoring-container'>
                      <span className='hockey-my-team-name'>{roster[0].team}</span>
                      <div className='football-score-button-container'>
                          <div className='td-fg-container'>
                              <div className='goal-scored'>
                                  <button onClick={touchdownScored}>Touchdown</button>
                              </div>
                              <div className='goal-scored'>
                                  <button onClick={fieldgoalScored}>Field Goal</button>
                              </div>
                          </div>
                          <div className='other-fb-scores'>
                              <div className='goal-scored'>
                                  <button onClick={extraPoint}>PAT</button>
                              </div>
                              <div className='goal-scored'>
                                  <button onClick={twoPointConversion}>2 PT Conversion</button>
                              </div>
                              <div className='goal-scored'>
                                  <button onClick={safetyScored}>Safety</button>
                              </div>
                          </div>
                      </div>
                      <div className='fb-additional-stats'>
                        <button onClick={tdPass}>TD Pass</button>
                        <button onClick={passIntercepted}>Interception</button>
                        <button onClick={tackleMade}>Tackle</button>
                        <button onClick={sackMade}>Sack</button>
                      </div>
                      <div className='next-period'>
                          {currentQuarter < 4 && <button onClick={endQuarter}>End Quarter</button>}
                          {currentQuarter >= 4 && <button onClick={endGame}>End Game</button>}
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

export default Football