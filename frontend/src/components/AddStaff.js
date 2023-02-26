import React from 'react'

function AddStaff(props) {
  return (
    <div className={`add-staff-container ${props.isActive ? 'active' : ''}` }>
        <span onClick={props.onClose}>X</span>
        <form>
            <label>Staff Member</label>
            <input
            placeholder='Enter name'
            />
            <button>Submit</button>
        </form>
    </div>
  )
}

export default AddStaff