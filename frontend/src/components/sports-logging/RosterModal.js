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
                      saveMade,
                      twoPointsModal,
                      twoPointsScored,
                      twoPointsMissedModal,
                      missedTwoPoints}) {

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
                }else if(twoPointsModal){
                    twoPointsScored(player.player, player._id)
                }else if(twoPointsMissedModal){
                    missedTwoPoints(player.player, player._id)
                }else{
                    console.log('Error')
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
                saveMade ? 'Save made by:' :
                twoPointsModal ? '2 PT FG made by:' : 
                twoPointsMissedModal ? 'Who missed the 2 PT FG?' : ''}</h3>
          </div>
            <ul className='modal-player-list'>
                {myRoster}
            </ul>
      </section>
    )
}

export default RosterModal