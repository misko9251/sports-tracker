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
              <h1>Game selected</h1>
            ) : (
              <h1>Practice!!</h1>
            )}
            <label>Title</label>
            <input
            placeholder='e.g. Coach'
            className='add-staff-input'
            name='title'
            />
            <button className='submit-new-staff-btn'>Submit</button>
        </form>
    </>
  )
}

export default Schedule