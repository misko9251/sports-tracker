import React, {useState} from 'react'

function Hockey() {

    const [currentPeriod, serCurrentPeriod] = useState(1)
    const [myScore, setMyScore] = useState(0)
    const [opponentScore, setOpponentScore] = useState(0)

    return (
        <>
            <header>
                <span>Period {currentPeriod}</span>
                <div>
                  <span>Lia's Ladies</span>
                  <span>{opponentScore} - {myScore}</span>
                  <span>Misko's Madmen</span>
                </div>
            </header>
            <section>
                <div>
                    <button>Lia's Ladies Goal</button>
                </div>
                <div>
                    <span>Misko's Madmen</span>
                    <div>
                        <div>
                            <button>Goal</button>
                        </div>
                        <div>
                            <button>Save</button>
                            <button>Assist</button>
                        </div>
                        <div>
                            <button>Shot Missed</button>
                        </div>
                    </div>
                    <div>
                        <button>End Period</button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Hockey