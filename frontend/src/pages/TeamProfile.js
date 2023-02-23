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
import AddTeam from '../components/AddTeam'

function TeamProfile() {
    const {teamId} = useParams()
    const [team, setTeam] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [sportLogo, setSportLogo] = useState('')

   useEffect(()=> {
    async function fetchData(){
      try {
        const response = await fetch(`http://localhost:2121/dashboard/team/${teamId}`, {credentials: 'include'})
        const data = await response.json()
        setTeam(data)
        if(data.team.sport == 'Hockey'){
          setSportLogo(<GiHockey size={80}/>)
        }if(data.team.sport == 'Baseball'){
          setSportLogo(<GiBaseballGlove size={80}/>)
        }if(data.team.sport == 'Softball'){
          setSportLogo(<TbBallBaseball size={80}/>)
        }if(data.team.sport == 'Football'){
          setSportLogo(<GiAmericanFootballPlayer size={80}/>)
        }if(data.team.sport == 'Soccer'){
          setSportLogo(<GiSoccerField size={80}/>)
        }if(data.team.sport == 'Basketball'){
          setSportLogo(<GiBasketballJersey size={80}/>)
        }if(data.team.sport == 'Lacrosse'){
          setSportLogo(<MdSportsKabaddi size={80}/>)
        }if(data.team.sport == 'Volleyball'){
          setSportLogo(<TbBallVolleyball size={80}/>)
        }if(data.team.sport == 'Bowling'){
          setSportLogo(<GiBowlingStrike size={80}/>)
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
                <h2>{team.team.teamName}</h2>
                <span>{team.team.record}</span>
              </div>
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