import React, {useState, useEffect} from 'react'
import {IoMdAdd} from 'react-icons/io'
import {useParams, Link} from 'react-router-dom'
import TabSpinner from './TabSpinner'
import AddEvent from './AddEvent'

function Schedule() {

  const [hasEventsScheduled, setHasEventsScheduled] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [schedule, setSchedule] = useState([])
  const [addEvent, setAddEvent] = useState(false)
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
  }, [schedule])

  const closeAddEvent = () => {
    setAddEvent(false)
  }
  
  const scheduledEvents = schedule.map((item)=> {
    let sport;
    if(item.sport == 'Hockey'){
      sport =  'hockey'
    }if(item.sport == 'Baseball'){
      sport = 'baseball'
    }if(item.sport == 'Softball'){
      sport = 'softball'
    }if(item.sport == 'Football'){
      sport = 'football'
    }if(item.sport == 'Soccer'){
      sport = 'soccer'
    }if(item.sport == 'Basketball'){
      sport = 'basketball'
    }if(item.sport == 'Lacrosse'){
      sport = 'lacrosse'
    }if(item.sport == 'Volleyball'){
      sport = 'volleyball'
    }if(item.sport == 'Bowling'){
      sport = 'bowling'
    }
    return (
      <Link
      className='custom-link-class'
      to={`/dashboard/team/${item.team}/sport/${sport}`}
      >
        <section className='individual-events'>
          <div className='event-date'>
            <span>{item.dayOfWeek}</span>
            <span style={{fontWeight: 'bolder'}}>{item.month} {item.day}</span>
          </div>
          <div className='event-type'>
            <span>{item.opponent ? ` vs. ${item.opponent}` : 'Practice'}</span>
          </div>
          <div className='event-time'>
            <span>{item.time}</span>
          </div>
        </section>
      </Link>
    )
  })

  return (
    <>
    <AddEvent 
    onClose={closeAddEvent}
    isActive={addEvent}
    />

    {isLoading ? <TabSpinner /> : (
      hasEventsScheduled ? (
      <section className='scheduled-events'>
        {scheduledEvents}
        <button onClick={() => setAddEvent(true)}><IoMdAdd />Add Event</button>
      </section> 
      )  : (
        <section className='no-data-added-container dashboard-tabs'>
            <h4>No Events Scheduled</h4>
            <button onClick={() => setAddEvent(true)}>Add Event</button>
        </section>    
      )
    )}
    </>
  )
}

export default Schedule