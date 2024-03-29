import React, {useEffect, useState, useContext} from 'react'
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
import AddTeam from '../components/AddTeam'
import {Link} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'

function ParentDashboard() {

  const [myTeams, setMyTeams] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSettingTeam, setIsSettingTeam] = useState(false)
  const [shouldDisplay, setShouldDisplay] = useState('flex')
  const {isAuthenticated, logout, loading} = useContext(AuthContext)

  useEffect(()=> {
    setShouldDisplay(isSettingTeam ? 'none' : 'flex')
  }, [isSettingTeam])

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

  function addTeam(){
    setIsSettingTeam(true)
  }

  function closeAddTeam(){
    setIsSettingTeam(false)
  }

  const teams = myTeams.map((item)=> {
    let sport;
    if(item.sport == 'Hockey'){
      sport = <GiHockey size={50}/>
    }if(item.sport == 'Baseball'){
      sport = <GiBaseballGlove size={50}/>
    }if(item.sport == 'Softball'){
      sport = <TbBallBaseball size={50}/>
    }if(item.sport == 'Football'){
      sport = <GiAmericanFootballPlayer size={50}/>
    }if(item.sport == 'Soccer'){
      sport = <GiSoccerField size={50}/>
    }if(item.sport == 'Basketball'){
      sport = <GiBasketballJersey size={50}/>
    }if(item.sport == 'Lacrosse'){
      sport = <MdSportsKabaddi size={50}/>
    }if(item.sport == 'Volleyball'){
      sport = <TbBallVolleyball size={50}/>
    }if(item.sport == 'Bowling'){
      sport = <GiBowlingStrike size={50}/>
    }
    return (
      <Link to={`/dashboard/${item._id}`} className='custom-link-class'>
        <div key={item._id} className='team-container'>
          <section className='my-sport-team dark-inner-container '>
              <span>{sport}</span>
              <span>{item.teamName}</span>
              <span>{item.sportType} League</span>
              <span>{item.age}</span>
              <span>{item.record}</span>
          </section>
        </div>
      </Link >
    )
  })

  return (
    <div>
      {isLoading ? <Spinner /> : (
        <div className="dashboard-container">
          <nav>
            <span 
            className='nav-logout'
            onClick={logout}
            >
              Logout
            </span>
            <h3>Home</h3>
            <span 
            className="add-team"
            onClick={addTeam}
            >+</span>
          </nav>
          <section style={{display: shouldDisplay}} className='my-sport-team-container'>
            {teams}
          </section>
          <AddTeam 
              onClose={closeAddTeam} 
              isActive={isSettingTeam}
              />
        </div>
      )}
    </div>
  );
}

export default ParentDashboard