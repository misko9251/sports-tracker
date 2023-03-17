import React, {useState} from 'react'
import ProfilePic from '../assets/default-athlete.png'
import PlayerVideos from '../components/PlayerVideos'

function PlayerProfile() {

  const [currentTab, setCurrentTab] = useState('video')

  return (
    <section className='profile-container'>
        <header className='profile-header'>
            <div className='profile-pic-container'>
                <img src={ProfilePic}/>
            </div>
            <div className='player-info'>
                <span className='player-name'>Jimmy</span>
                <span>Misko's Madmen</span>
                <span>Left Wing</span>
            </div>
            <ul className='profile-list'>
                <li onClick={() => setCurrentTab('video')}>Video Clips</li>
                <li onClick={() => setCurrentTab('stats')}>Stats</li>
                <li onClick={() => setCurrentTab('contacts')}>Contacts</li>
            </ul>
        </header>
        <section className='tab-container'>
             {currentTab === 'video' ? <PlayerVideos /> : null
            }
        </section>
    </section>
  )
}

export default PlayerProfile