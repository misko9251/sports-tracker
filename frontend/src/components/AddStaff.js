import React, {useState} from 'react'
import {AiOutlineCloseSquare} from 'react-icons/ai'
import {useParams} from 'react-router-dom'

function AddStaff(props) {

  const {teamId} = useParams()
  
  const [formData, setFormData] = useState({
    name: '',
    title: ''
  })

  const onChange = (e) => {
    setFormData((prevVal)=> {
      return{
        ...prevVal,
        [e.target.name]: e.target.value
      }
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch(`http://localhost:2121/dashboard/addStaff/${teamId}`, {
      credentials: 'include',
      method: 'POST',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({...formData})
    })
  }

  return (
    <div className={`add-staff-container ${props.isActive ? 'active show' : ''}` }>
        <form onSubmit={onSubmit} className='add-staff-form add-team-form'>
            <span className='close-staff-form' onClick={props.onClose}>{<AiOutlineCloseSquare/>}</span>
            <label>Add Staff Member</label>
            <input
            placeholder='Enter name'
            className='add-staff-input'
            name='name'
            onChange={onChange}
            />
            <label>Title</label>
            <input
            placeholder='e.g. Coach'
            className='add-staff-input'
            name='title'
            onChange={onChange}
            />
            <button className='submit-new-staff-btn'>Submit</button>
        </form>
    </div>
  )
}

export default AddStaff