import React from 'react'

function AddTeam(props) {
    console.log(props)
  return (
    <div className={`add-team-container ${props.isActive ? 'active' : ''}`}>
        <span onClick={props.onClose}>X</span>
        <h1>Create your team</h1>
        <h4>Select your sport</h4>
    </div>
  )
}

export default AddTeam