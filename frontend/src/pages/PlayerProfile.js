import React, {useState, useEffect} from 'react'
import ProfilePic from '../assets/default-athlete.png'
import PlayerVideos from '../components/PlayerVideos'
import {useParams} from 'react-router-dom'
import Spinner from '../components/Spinner'
import PlayerStats from '../components/PlayerStats'
import Contacts from '../components/Contacts'

function PlayerProfile() {

  const {teamId, playerId} = useParams()
  const [currentTab, setCurrentTab] = useState('video')
  const [currentPlayer, setCurrentPlayer] = useState({})
  const [isLoading, setisLoading] = useState(true)
  console.log(currentPlayer)

  useEffect(()=> {
    async function fetchData(){
        const response = await fetch(
            `http://localhost:2121/dashboard/team/${teamId}/player/${playerId}/getPlayer`,
            {credentials: 'include'}
        )
        const json = await response.json()
        setCurrentPlayer(json.player)
        setisLoading(false)
    }
    fetchData()
  }, [])

  return (
    <>
        {isLoading ? <Spinner /> : (
        <section className='profile-container'>
            <header className='profile-header'>
                <div className='profile-pic-container'>
                    <img src={currentPlayer.image}/>
                </div>
                <div className='player-info'>
                    <span className='player-name'>{currentPlayer.player}</span>
                    <span>{currentPlayer.team}</span>
                    <span>{currentPlayer.position}</span>
                </div>
                <ul className='profile-list'>
                    <li onClick={() => setCurrentTab('video')}>Video Clips</li>
                    <li onClick={() => setCurrentTab('stats')}>Stats</li>
                    <li onClick={() => setCurrentTab('contacts')}>Contacts</li>
                </ul>
            </header>
            <section className='tab-container'>
                 {currentTab === 'video' ? <PlayerVideos /> :
                  currentTab === 'stats' ? <PlayerStats /> : 
                  currentTab === 'contacts' ? <Contacts /> : null
                }
            </section>
        </section>
    )}
    </>
  )
}

export default PlayerProfile