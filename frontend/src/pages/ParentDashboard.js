import React, {useEffect, useState} from 'react'
import Spinner from '../components/Spinner'

function ParentDashboard() {

  const [myTeams, setMyTeams] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  console.log(myTeams)

  useEffect(()=> {
    async function fetchData(){
      try {
        const response = await fetch('http://localhost:2121/dashboard/getTeams', {credentials: 'include'})
        const json = await response.json()
        setMyTeams(json.teams)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  const teams = myTeams.map((item)=> {
    return (
      <section className='mySportTeam'>
        <span>{item.sport}</span>
        <span>{item.sportType}</span>
        <span>{item.age}</span>
      </section>
    )
  })

  return (
    <div>
      {isLoading ? <Spinner /> : (
        <div className="main-dark-container dashboard-container">
          <nav>
            <h3>Home</h3>
            <span className="add-team">+</span>
          </nav>
          <section>
            {teams}
          </section>
        </div>
      )}
    </div>
  );
}

export default ParentDashboard