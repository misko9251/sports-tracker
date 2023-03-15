import React from 'react'
import {AiOutlineCloseSquare} from 'react-icons/ai'

function AddVideo(props) {
  return (
    <div className={`add-video-container ${props.isActive ? `active` : ''}`}>
        <form className='add-player-form add-team-form'>
            <span className='close-staff-form' onClick={props.onClose}>{<AiOutlineCloseSquare/>}</span>
            <label>Add a Video Description</label>
            <input
            placeholder='Describe your video in a few words'
            type='text'
            name='description'
            className='add-staff-input'
            />
            <label>Video</label>
            <input
            id='fileInput'
            type='file'
            name='video'
            className='add-staff-input'
            />

            <button style={{marginTop: '2%'}}className='submit-new-player-btn'>Submit</button>
        </form>
    </div>
  )
}

export default AddVideo