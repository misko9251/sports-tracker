import React from 'react'

function RosterModal({roster, isActive, closeModal, playerScored}) {

    const myRoster = roster.map((player)=> {
        return (
            <li 
            onClick={()=>playerScored(player.player)}
            className='modal-player'>
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
            <ul className='modal-player-list'>
                {myRoster}
            </ul>
      </section>
    )
}

export default RosterModal