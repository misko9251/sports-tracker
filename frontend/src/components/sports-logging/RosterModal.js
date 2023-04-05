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
                      missedTwoPoints,
                      threePointsModal,
                      threePointsScored,
                      threePointsMissedModal,
                      missedThreePoints,
                      freeThrowMadeModal,
                      freeThrowMade,
                      reboundModal,
                      reboundMade,
                      assistBasketballModal,
                      assistMade,
                      blockModal,
                      blockMade,
                      stealModal,
                      stealMade,
                      touchdownModal,
                      fieldgoalModal,
                      extraPointModal,
                      twoPointConversationModal,
                      safetyScoredModal}) {

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
                }else if(freeThrowMadeModal){
                    freeThrowMade(player.player, player._id)
                }else if(reboundModal){
                    reboundMade(player.player, player._id)
                }else if(assistBasketballModal){
                    assistMade(player.player, player._id)
                }else if(blockModal){
                    blockMade(player.player, player._id)
                }else if(stealModal){
                    stealMade(player.player, player._id)
                }else if(threePointsModal){
                    threePointsScored(player.player, player._id)
                }else if(threePointsMissedModal){
                    missedThreePoints(player.player, player._id)
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
                twoPointsMissedModal ? '2 PT FG missed by:' : 
                freeThrowMadeModal ? 'Free throw made by:' : 
                reboundModal ? 'Rebound made by:' : 
                assistBasketballModal ? 'Assist made by:' : 
                blockModal ? 'Block made by:' : 
                stealModal ? 'Select the player who made the steal:' :
                threePointsModal ? '3 PT FG made by:' : 
                threePointsMissedModal ? '3 PT FG missed by:' : 
                touchdownModal ? 'Touchdown scored by:' : 
                fieldgoalModal ? 'Field Goal made by:' : 
                extraPointModal ? 'PAT made by:' : 
                twoPointConversationModal ? '2 PT Conversion scored by:' : 
                safetyScoredModal ? 'Safety scored by:' : ''}</h3>
          </div>
            <ul className='modal-player-list'>
                {myRoster}
            </ul>
      </section>
    )
}

export default RosterModal