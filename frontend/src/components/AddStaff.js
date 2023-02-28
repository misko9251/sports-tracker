import React from 'react'

function AddStaff(props) {
  return (
    <div className={`add-staff-container ${props.isActive ? 'active show' : ''}` }>
        <span onClick={props.onClose}>X</span>
        <form className='add-staff-form add-team-form'>
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