import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
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
import Schedule from '../components/Schedule'
import Team from '../components/Team'

function TeamProfile() {
    const {teamId} = useParams()
    const [team, setTeam] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [sportLogo, setSportLogo] = useState('')
    const [currentTab, setCurrentTab] = useState('schedule')
    
   useEffect(()=> {
    async function fetchData(){
      try {
        const response = await fetch(`http://localhost:2121/dashboard/team/${teamId}`, {credentials: 'include'})
        const data = await response.json()
        setTeam(data)
        if(data.team.sport == 'Hockey'){
          setSportLogo(<GiHockey className='sport-type' size={80}/>)
        }if(data.team.sport == 'Baseball'){
          setSportLogo(<GiBaseballGlove className='sport-type' size={80}/>)
        }if(data.team.sport == 'Softball'){
          setSportLogo(<TbBallBaseball className='sport-type' size={80}/>)
        }if(data.team.sport == 'Football'){
          setSportLogo(<GiAmericanFootballPlayer className='sport-type' size={80}/>)
        }if(data.team.sport == 'Soccer'){
          setSportLogo(<GiSoccerField className='sport-type' size={80}/>)
        }if(data.team.sport == 'Basketball'){
          setSportLogo(<GiBasketballJersey className='sport-type' size={80}/>)
        }if(data.team.sport == 'Lacrosse'){
          setSportLogo(<MdSportsKabaddi className='sport-type' size={80}/>)
        }if(data.team.sport == 'Volleyball'){
          setSportLogo(<TbBallVolleyball className='sport-type' size={80}/>)
        }if(data.team.sport == 'Bowling'){
          setSportLogo(<GiBowlingStrike className='sport-type' size={80}/>)
        }
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
              <div className='team-profile-info'>
                <h2>{sportLogo}</h2>
                <span className='team-profile-name'>{team.team.teamName}</span>
                <span>{team.team.record}</span>
              </div>
              <ul className='team-profile-list'>
                <li onClick={() => setCurrentTab('schedule')}>Schedule</li>
                <li onClick={() => setCurrentTab('team')}>Team</li>
                <li onClick={() => setCurrentTab('video')}>Video</li>
                <li onClick={() => setCurrentTab('stats')}>Stats</li>
              </ul>
            </header>
            <section className='tab-container'>
             {currentTab === 'schedule' ? <Schedule /> :
              currentTab === 'team' ? <Team /> : null
            }
            </section>
        </section>
      )}
      </>
    )
}

export default TeamProfile