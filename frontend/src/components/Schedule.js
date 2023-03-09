import React, {useState, useEffect} from 'react'
import {AiOutlineCloseSquare} from 'react-icons/ai'
import {useParams} from 'react-router-dom'
import TabSpinner from './TabSpinner'

function Schedule() {

  const [hasEventsScheduled, setHasEventsScheduled] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [eventType, setEventType] = useState('Game')
  const [schedule, setSchedule] = useState([])
  const [gameType, setGameType] = useState({
    eventType: 'Game'
  })
  const [gameForm, setGameForm] = useState({
    homeOrAway: 'Home',
    opponent: '',
    date: '',
    time: '',
  })
  const [practiceForm, setPracticeForm] = useState({
    date: '',
    time: '',
    location: ''
  })
  const {teamId} = useParams()

  useEffect(()=> {
    async function fetchData(){
      const response = await fetch(`http://localhost:2121/dashboard/getSchedule/${teamId}`,{
        credentials: 'include'
      })
      const json = await response.json()
      setSchedule(json.schedule)
      if(json.schedule.length > 0){
        setHasEventsScheduled(true)
      }
      setIsLoading(false)
    }
    fetchData()
  }, [])

  const handleChange = (e) => {
    const {name, value} = e.target
    setGameType((prevVal)=> {
      return {
        ...prevVal,
        [e.target.name]: e.target.value,
      }
    })
    e.target.value == 'Game' ? setEventType('Game') : setEventType('Practice')
  }

  const handleGameChange = (e) => {
    setGameForm((prevVal)=> {
      return {
        ...prevVal,
        [e.target.name]: e.target.value
      }
    })
  }
  
  const handlePracticeChange = (e) => {
    setPracticeForm((prevVal)=> {
      return {
        ...prevVal,
        [e.target.name]: e.target.value
      }
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    let form;
    if(eventType == 'Game'){
      form = gameForm
    }else{
      form = practiceForm
    }
    const response = await fetch(`http://localhost:2121/dashboard/addToSchedule/${teamId}`, {
      credentials: 'include',
      method: 'POST',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({eventType, ...form})
    })
    const json = await response.json()
    console.log(json)
  }

  return (
    <>
    {isLoading ? <TabSpinner /> : (
      <>
      <section className='schedule-container dashboard-tabs'>
          <h4>No Events Scheduled</h4>
          <button>Add Event</button>
      </section>
      <form onSubmit={onSubmit} className='add-staff-form add-team-form'>
            <span className='close-staff-form'>{<AiOutlineCloseSquare/>}</span>
            <label>Event Type</label>
            <select value={gameType.type} onChange={handleChange} name='type'>
              <option value='Game'>Game</option>
              <option value='Practice'>Practice</option>
            </select>
            {eventType == 'Game' ? (
                <>
                <label>Home/Away</label>
                <select name='homeOrAway' onChange={handleGameChange}>
                    <option value='Home'>Home</option>
                    <option value='Away'>Away</option>
                </select>
                <label>Opponent</label>
                <input
                type='text'
                placeholder='Add opponent'
                name='opponent'
                onChange={handleGameChange}
                />
                <label>Date</label>
                <input
                type='date'
                style={{textIndent: '10px'}}
                name='date'
                onChange={handleGameChange}
                />
                <label>Time</label>
                <input
                type='time'
                style={{textIndent: '10px'}}
                name='time'
                onChange={handleGameChange}
                />
                </>
            ) : (
              <>
                <label>Date</label>
                <input
                type='date'
                style={{textIndent: '10px'}}
                name='date'
                onChange={handlePracticeChange}
                />
                <label>Time</label>
                <input
                type='time'
                style={{textIndent: '10px'}}
                name='time'
                onChange={handlePracticeChange}
                />
                <label>Location</label>
                <input
                type='text'
                placeholder='Enter an address'
                name='location'
                onChange={handlePracticeChange}
                />
              </>
            )}
            <button className='submit-new-staff-btn'>Submit</button>
        </form>
      </>
    )}
    </>
  )
}

export default Schedule