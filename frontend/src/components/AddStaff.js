import React from 'react'

function AddStaff(props) {
  return (
    <div className={`add-staff-container ${props.isActive ? 'active show' : ''}` }>
        <span onClick={props.onClose}>X</span>
        <form className='add-staff-form'>
            <label>Add Staff Member</label>
            <input
            placeholder='Enter name'
            />
            <label>Title</label>
            <input
            placeholder='e.g. Coach'
            />
            <button>Submit</button>
        </form>
    </div>
  )
}

export default AddStaff