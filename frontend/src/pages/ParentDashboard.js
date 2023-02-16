import React, {useEffect, useState} from 'react'
import Spinner from '../components/Spinner'
import {GiHockey} from 'react-icons/gi'
import {GiBaseballGlove} from 'react-icons/gi'
import {TbBallBaseball} from 'react-icons/tb'
import {GiAmericanFootballPlayer} from 'react-icons/gi'
import {GiSoccerField} from 'react-icons/gi'
import {GiBasketballJersey} from 'react-icons/gi'
import {MdSportsKabaddi} from 'react-icons/md'
import {TbBallVolleyball} from 'react-icons/tb'
import {GiBowlingStrike} from 'react-icons/gi'

function ParentDashboard() {

  const [myTeams, setMyTeams] = useState([])
  const [isLoading, setIsLoading] = useState(true)

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
  }, [myTeams])

  function addTeam(){
    console.log('hey')
  }

  const teams = myTeams.map((item)=> {
    let sport;
    if(item.sport == 'Hockey'){
      sport = <GiHockey size={50}/>
    }if(item.sport == 'Baseball'){
      sport = <GiBaseballGlove />
    }
    return (
      <div className='team-container'>
      <span className='league-date'>Fall 2022</span>
      <section className='my-sport-team dark-inner-container '>
          <span>{sport}</span>
          <span>League: {item.sportType}</span>
          <span>Age: {item.age}</span>
          <span>Record: {item.record}</span>
      </section>
      </div>
    )
  })

  return (
    <div>
      {isLoading ? <Spinner /> : (
        <div className="main-dark-container dashboard-container">
          <nav>
            <h3>Home</h3>
            <span 
            className="add-team"
            onClick={addTeam}
            >+</span>
          </nav>
          {/* <h3>My Teams</h3> */}
          <section className='my-sport-team-container'>
            {teams}
          </section>
        </div>
      )}
    </div>
  );
}

export default ParentDashboard