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
  const [currentSport, setCurrentSport] = useState('')
  const {teamId} = useParams()
  console.log(currentSport)

  useEffect(()=> {
    async function fetchData(){
      const response = await fetch(`http://localhost:2121/dashboard/getSchedule/${teamId}`,{
        credentials: 'include'
      })
      const json = await response.json()
      setSchedule(json.schedule)
      const hasEvents = json.schedule.some((event) => !event.isComplete);
      setHasEventsScheduled(hasEvents);
      if(json.schedule.length > 0){
        setCurrentSport(json.schedule[0].sport)
      }
      setIsLoading(false)
    }
    fetchData()
  }, [schedule, addEvent])

  const closeAddEvent = () => {
    setAddEvent(false)
  }
  
  const scheduledEvents = schedule.map((item) => {
    if (!item.isComplete) {
      return (
        <Link
          className='custom-link-class'
          to={`/dashboard/team/${item.teamId}/sport/${currentSport}/event/${item._id}`}
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
      );
    }
    return null;
  });

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