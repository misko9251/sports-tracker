import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import Spinner from '../components/Spinner'

function TeamProfile() {
    const {teamId} = useParams()
    const [team, setTeam] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    console.log(team.team)

   useEffect(()=> {
    async function fetchData(){
      try {
        const response = await fetch(`http://localhost:2121/dashboard/team/${teamId}`, {credentials: 'include'})
        const data = await response.json()
        setTeam(data)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

    return (
      <>
      {isLoading ? <Spinner /> : (
        <section className='dashboard-container'>
            <header className='team-profile-header'>
              <h2>{team.team.teamName}</h2>
              <ul className='team-profile-list'>
                <li>Schedule</li>
                <li>Team</li>
                <li>Video</li>
                <li>Stats</li>
              </ul>
            </header>
        </section>
      )}
      </>
    )
}

export default TeamProfile