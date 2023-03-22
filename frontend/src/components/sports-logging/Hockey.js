import React, {useState} from 'react'

function Hockey() {

    const [currentPeriod, serCurrentPeriod] = useState(1)
    const [myScore, setMyScore] = useState(0)
    const [opponentScore, setOpponentScore] = useState(0)

    return (
        <div style={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
            <header className='logger-header'>
                <span className='logger-current-time'>Period {currentPeriod}</span>
                <div className='logger-scores'>
                  <span>Lia's Ladies</span>
                  <span className='logger-current-score'>{opponentScore} - {myScore}</span>
                  <span>Misko's Madmen</span>
                </div>
            </header>
            <section style={{flexGrow: 1, backgroundColor: 'rgb(47, 47, 47)'}}>
                <div className='opponent-goal'>
                    <button>Lia's Ladies Goal</button>
                </div>
                <div className='team-scoring-container'>
                    <span className='hockey-my-team-name'>Misko's Madmen</span>
                    <div className='score-button-container'>
                        <div className='goal-scored'>
                            <button>Goal</button>
                        </div>
                        <div className='save-assist-container'>
                            <button>Save</button>
                            <button>Assist</button>
                        </div>
                        <div className='shot-missed'>
                            <button>Shot Missed</button>
                        </div>
                    </div>
                    <div className='next-period'>
                        <button>End Period</button>
                    </div>
                </div>
                <section className='play-by-play'>
                    <h3>Play by Play</h3>
                </section>
            </section>
        </div>
    )
}

export default Hockey