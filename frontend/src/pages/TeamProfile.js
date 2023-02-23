import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import Spinner from '../components/Spinner'

function TeamProfile() {
    const {teamId} = useParams()
    const [team, setTeam] = useState({})
    const [isLoading, setIsLoading] = useState(true)

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
      <section className='dashboard-container'>
        <h1>TEST</h1>
      </section>
    )
}

export default TeamProfile