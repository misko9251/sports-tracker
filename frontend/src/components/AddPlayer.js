import React from 'react'
import {AiOutlineCloseSquare} from 'react-icons/ai'

function AddPlayer(props) {
  return (
    <div className={`add-player-container ${props.isActive ? 'active show' : ''}` }>
    <form className='add-staff-form add-team-form'>
        <span className='close-staff-form' onClick={props.onClose}>{<AiOutlineCloseSquare/>}</span>
        <label>Add Player</label>
        <input
        placeholder='Enter name'
        className='add-staff-input'
        type='text'
        />
        <label>Position</label>
        <input
        placeholder='e.g. Coach'
        className='add-staff-input'
        type='text'
        />
        <label>Player Image</label>
        <input
        placeholder='e.g. Coach'
        type='file'
        />
        <button style={{marginTop: '2%'}}className='submit-new-player-btn'>Submit</button>
    </form>
</div>
  )
}

export default AddPlayer