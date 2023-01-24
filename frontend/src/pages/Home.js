import React from 'react'
import headerVideo from '../assets/backgroundHeader.mp4'

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
    </>
  )
}

export default Home