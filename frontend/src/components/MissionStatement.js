import React from 'react'
import {AiFillPlayCircle} from 'react-icons/ai'
import {BsArrowRight} from 'react-icons/bs'

function MissionStatement(props) {
    const arrowColor = '#0077b6'
  return (
    <div className='mission-statement'>
        <span><AiFillPlayCircle color={props.logoColor} size={45}/></span>
        <h5>Upload videos</h5>
        <p>Bring the game to anyone, anywhere! Upload highlight reel worthy plays!</p>
        <span><BsArrowRight className='arrow' color={arrowColor} size={30}/></span>
    </div>
  )
}

export default MissionStatement