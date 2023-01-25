import React from 'react'
import headerVideo from '../assets/backgroundHeader.mp4'
import MissionStatement from '../components/MissionStatement'

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
                <MissionStatement logoColor={'#03045e'}/>
                <MissionStatement />
                <MissionStatement />
            </div>
        </section>
    </>
  )
}

export default Home