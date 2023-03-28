import React from 'react'

function RosterModal({roster, 
                      isActive, 
                      closeModal, 
                      playerScored, 
                      playerAssist,
                      playerMissedShot, 
                      playerMadeSave,
                      goalModal, 
                      assistModal,
                      shotMissedModal,
                      saveMade}) {

    console.log(assistModal)

    const myRoster = roster.map((player)=> {
        return (
            <li 
            onClick={()=>
                {if(goalModal){
                    playerScored(player.player, player._id)
                }else if(assistModal){
                    playerAssist(player.player, player._id)
                }else if(shotMissedModal){
                    playerMissedShot(player.player, player._id)
                }else if(saveMade){
                    playerMadeSave(player.player, player._id)
                }else{
                    console.log('hey')
                }}
            }
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
            <h3>{goalModal ? 'Select the player who scored:' : 
                assistModal ? 'Assist made by:' :
                shotMissedModal ? 'Shot missed by:' : 
                saveMade ? 'Save made by:' : ''}</h3>
          </div>
            <ul className='modal-player-list'>
                {myRoster}
            </ul>
      </section>
    )
}

export default RosterModal