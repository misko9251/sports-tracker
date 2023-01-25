import React from 'react'
import headerVideo from '../assets/backgroundHeader.mp4'
import MissionStatement from '../components/MissionStatement'
import MiniSportsLogo from '../components/MiniSportsLogo'
import {AiFillPlayCircle} from 'react-icons/ai'
import {BsFillPencilFill} from 'react-icons/bs'
import {MdOutlineSportsHandball} from 'react-icons/md'
import {GiHockey} from 'react-icons/gi'
import {GiBaseballGlove} from 'react-icons/gi'
import {TbBallBaseball} from 'react-icons/tb'
import {GiAmericanFootballPlayer} from 'react-icons/gi'
import {GiSoccerField} from 'react-icons/gi'
import {GiBasketballJersey} from 'react-icons/gi'
import {MdSportsKabaddi} from 'react-icons/md'
import {TbBallVolleyball} from 'react-icons/tb'
import {GiBowlingStrike} from 'react-icons/gi'

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
        <section>
            <h3 className='sports-heading-choices'>Sports-On-The-Go offers tracking for multiple sports!</h3>
            <div className='sport-choice-container'>
                <MiniSportsLogo 
                sportsImg={<GiHockey size={50}/>}
                sportName={'Hockey'}
                />
                <MiniSportsLogo 
                sportsImg={<GiBaseballGlove size={50}/>}
                sportName={'Baseball'}
                />
                <MiniSportsLogo 
                sportsImg={<TbBallBaseball size={50}/>}
                sportName={'Softball'}
                />
                <MiniSportsLogo 
                sportsImg={<GiAmericanFootballPlayer size={50}/>}
                sportName={'Football'}
                />
                <MiniSportsLogo 
                sportsImg={<GiSoccerField size={50}/>}
                sportName={'Soccer'}
                />
                <MiniSportsLogo 
                sportsImg={<GiBasketballJersey size={50}/>}
                sportName={'Basketball'}
                />
                <MiniSportsLogo 
                sportsImg={<MdSportsKabaddi size={50}/>}
                sportName={'Lacrosse'}
                />
                <MiniSportsLogo 
                sportsImg={<TbBallVolleyball size={50}/>}
                sportName={'Volleyball'}
                />
                <MiniSportsLogo 
                sportsImg={<GiBowlingStrike size={50}/>}
                sportName={'Bowling'}
                />
            </div>
        </section>
    </>
  )
}

export default Home