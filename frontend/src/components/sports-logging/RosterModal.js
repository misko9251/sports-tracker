import React from 'react'

function RosterModal({roster, isActive, closeModal}) {
    console.log(isActive)

    const myRoster = roster.map((player)=> {
        return (
            <li>
                <span>{player.player}</span>
                <span>{player.position}</span>
            </li>
        )
    })

    return (
      <section className={`roster-modal ${isActive ? 'active' : ''} `}>
          <div className='select-player'>
            <span className='close-modal' onClick={closeModal}>X</span>
            <h3>Select the player who scored:</h3>
          </div>
            <ul>
                {myRoster}
            </ul>
      </section>
    )
}

export default RosterModal