import React from 'react'
import {AiFillPlayCircle} from 'react-icons/ai'
import {BsArrowRight} from 'react-icons/bs'

function MissionStatement(props) {
    const arrowColor = '#0077b6'
  return (
    <div className='mission-statement'>
        <span>{props.logo}</span>
        <h5>{props.title}</h5>
        <p>{props.content}</p>
        <span><BsArrowRight className='arrow' color={arrowColor} size={30}/></span>
    </div>
  )
}

export default MissionStatement