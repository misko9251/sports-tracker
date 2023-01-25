import React from 'react'

function MiniSportsLogo(props) {
  return (
    <div className='mini-sports-logo'>
        <span>{props.sportsImg}</span>
        <span className='sport-name'>{props.sportName}</span>
    </div>
  )
}

export default MiniSportsLogo