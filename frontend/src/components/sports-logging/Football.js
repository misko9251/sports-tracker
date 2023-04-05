import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import Spinner from '../Spinner'
import RosterModal from './RosterModal'
import {useNavigate} from 'react-router-dom'
import GameComplete from './GameComplete'

function Football() {

    const {teamId, eventId} = useParams()
    // const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true)
    const [currentQuarter, setCurrentQuarter] = useState(1)
    const [opponentScore, setOpponentScore] = useState(0)
    const [myScore, setMyScore] = useState(0)
    const [roster, setRoster] = useState([])
    const [scheduledEvent, setScheduledEvent] = useState([])
    const [isActive, setIsActive] = useState(false)
    const [touchdownModal, setTouchdownModal] = useState(false)
    const [fieldgoalModal, setFieldgoalModal] = useState(false)
    const [extraPointModal, setExtraPointModal] = useState(false)
    const [twoPointConversationModal, setTwoPointConversationModal] = useState(false)
    const [safetyScoredModal, setSafetyScoredModal] = useState(false)

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

  const closeModal = () => {
    setIsActive(false)
    setTouchdownModal(false)
    setFieldgoalModal(false)
    setExtraPointModal(false)
    setTwoPointConversationModal(false)
    setSafetyScoredModal(false)
}

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
                  <div className='opponent-basket opponent-football'>
                    <div className='opponent-fb-stats'>
                        <div className='td-fg-container'>
                            <button onClick=''>
                                  {scheduledEvent.opponent} Touchdown
                              </button>
                              <button onClick=''>
                                  {scheduledEvent.opponent} Field Goal
                            </button>
                        </div>
                        <div className='other-fb-scores'>
                            <button onClick=''>
                                  {scheduledEvent.opponent} PAT
                              </button>
                              <button onClick=''>
                                  {scheduledEvent.opponent} 2 PT Conversion
                              </button>
                              <button onClick=''>
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
                        <button>TD Pass</button>
                        <button>Interception</button>
                        <button>Tackle</button>
                        <button>Sack</button>
                      </div>
                      <div className='next-period'>
                          {/* {currentQuarter < 4 && <button onClick={endQuarter}>End Quarter</button>}
                          {currentQuarter >= 4 && <button onClick={endGame}>End Game</button>} */}
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

export default Football