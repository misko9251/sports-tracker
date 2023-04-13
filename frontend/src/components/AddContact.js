import React, {useState} from 'react'
import {AiOutlineCloseSquare} from 'react-icons/ai'
import {useParams} from 'react-router-dom'

function AddContact(props) {

    const {teamId, playerId} = useParams()

    const [formData, setFormData] = useState({
        name: '',
        relationship: '',
        number: ''
    })

    console.log(formData)

    const onChange = (e) => {
        setFormData((prevVal)=>{
            return{
                ...prevVal,
                [e.target.name]: e.target.value
            }
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(`http://localhost:2121/dashboard/team/${teamId}/player/${playerId}/addContact`, {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({...formData})
        })
        const json = await response.json()
        props.onClose()
        setFormData({name: '', relationship: '', number: ''})
        e.target.reset()
    }

  return (
    <div className={`add-player-container ${props.isActive ? 'active show' : ''}` }>
        <form onSubmit={onSubmit} className='add-player-form add-team-form'>
            <span className='close-staff-form' onClick={props.onClose}>{<AiOutlineCloseSquare/>}</span>
            <label>Add Contact</label>
            <input
            placeholder='Enter name'
            className='add-staff-input'
            type='text'
            onChange={onChange}
            value={formData.name}
            name='name'
            />
            <label>Relationship</label>
            <input
            placeholder='e.g. Emergency Contact'
            className='add-staff-input'
            type='text'
            onChange={onChange}
            value={formData.position}
            name='relationship'
            />
            <label>Phone Number</label>
            <input
            placeholder='XXXXXXXXXX'
            maxLength="10"
            className='add-staff-input'
            type='text'
            onChange={onChange}
            value={formData.position}
            name='number'
            />

            <button style={{marginTop: '2%'}}className='submit-new-player-btn'>Submit</button>
        </form>
    </div>
  )
}

export default AddContact