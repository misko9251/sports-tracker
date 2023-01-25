import React from 'react'
import headerVideo from '../assets/backgroundHeader.mp4'
import MissionStatement from '../components/MissionStatement'
import {AiFillPlayCircle} from 'react-icons/ai'
import {BsFillPencilFill} from 'react-icons/bs'
import {MdOutlineSportsHandball} from 'react-icons/md'

function Home() {
  return (
    <>
        <header>
            <div className='video-text-container'>
                <video className='videoTag' autoPlay loop muted>
                    <source src={headerVideo} type='video/mp4' />
                </video>
                <div className="text-overlay">
                    <h1>One place for every team.</h1>
                    <p>Upload. Score. Share.</p>
                </div>
            </div>
        </header>
        <section>
            <div className='mission-statement-container'>
                <MissionStatement 
                logo={<AiFillPlayCircle color={'#03045e'} size={45}/>}
                title={'Upload Videos'}
                content={'Bring the game to anyone, anywhere! Upload highlight reel worthy plays!'}
                />
                <MissionStatement 
                logo={<BsFillPencilFill color={'#03045e'} size={45}/>}
                title={'Track Gameplay'}
                content={'Cant make the game? Read all of the play-by-play provided by loved ones.'}
                />
                <MissionStatement 
                logo={<MdOutlineSportsHandball color={'#03045e'} size={45}/>}
                title={'Live Rosters'}
                content={'Update rosters and player profiles so every kid feels like a professional!'}
                />
            </div>
        </section>
    </>
  )
}

export default Home