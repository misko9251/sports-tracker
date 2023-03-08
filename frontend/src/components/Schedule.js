import React, {useState} from 'react'
import {AiOutlineCloseSquare} from 'react-icons/ai'

function Schedule() {

  const [hasEventsScheduled, setHasEventsScheduled] = useState(false)
  const [type, setType] = useState('Game')
  const [formData, setFormData] = useState({
    type: 'Game'
  })
  console.log(formData)

  const handleChange = (e) => {
    setFormData((prevVal)=> {
      return {
        ...prevVal,
        [e.target.name]: e.target.value
      }
    })
    e.target.value == 'Game' ? setType('Game') : setType('Practice')
  }

  return (
    <>
      <section className='schedule-container dashboard-tabs'>
          <h4>No Events Scheduled</h4>
          <button>Add Event</button>
      </section>
      <form className='add-staff-form add-team-form'>
            <span className='close-staff-form'>{<AiOutlineCloseSquare/>}</span>
            <label>Event Type</label>
            <select value={formData.type} onChange={handleChange} name='type'>
              <option value='Game'>Game</option>
              <option value='Practice'>Practice</option>
            </select>
            {type == 'Game' ? (
                <>
                <label>Home/Away</label>
                <select>
                    <option value='Home'>Home</option>
                    <option value='Away'>Away</option>
                </select>
                <label>Opponent</label>
                <input
                type='text'
                placeholder='Add opponent'
                />
                <label>Date</label>
                <input
                type='date'
                style={{textIndent: '10px'}}
                />
                <label>Time</label>
                <input
                type='time'
                style={{textIndent: '10px'}}
                />
                </>
            ) : (
              <>
                <label>Date</label>
                <input
                type='date'
                style={{textIndent: '10px'}}
                />
                <label>Time</label>
                <input
                type='time'
                style={{textIndent: '10px'}}
                />
                <label>Location</label>
                <input
                type='text'
                placeholder='Enter an address'
                />
              </>
            )}
            <button className='submit-new-staff-btn'>Submit</button>
        </form>
    </>
  )
}

export default Schedule