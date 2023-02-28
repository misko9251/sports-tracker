import React from 'react'
import {AiOutlineCloseSquare} from 'react-icons/ai'

function AddStaff(props) {
    console.log(props)
  return (
    <div className={`add-staff-container ${props.isActive ? 'active show' : ''}` }>
        <form className='add-staff-form add-team-form'>
            <span className='close-staff-form' onClick={props.onClose}>{<AiOutlineCloseSquare/>}</span>
            <label>Add Staff Member</label>
            <input
            placeholder='Enter name'
            className='add-staff-input'
            />
            <label>Title</label>
            <input
            placeholder='e.g. Coach'
            className='add-staff-input'
            />
            <button className='submit-new-staff-btn'>Submit</button>
        </form>
    </div>
  )
}

export default AddStaff