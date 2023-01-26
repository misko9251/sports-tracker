import React from 'react'
import {GiHockey} from 'react-icons/gi'
import {GiBaseballGlove} from 'react-icons/gi'
import {TbBallBaseball} from 'react-icons/tb'
import {GiAmericanFootballPlayer} from 'react-icons/gi'
import {GiSoccerField} from 'react-icons/gi'
import {GiBasketballJersey} from 'react-icons/gi'
import {MdSportsKabaddi} from 'react-icons/md'
import {TbBallVolleyball} from 'react-icons/tb'
import {GiBowlingStrike} from 'react-icons/gi'

function SportsDropDown() {
  return (
    <div className='sports-drop-down'>
        <div className='drop-down-sports-logo'>
            <GiHockey size={30}/>
            <span>Hockey</span>
        </div>
        <div className='drop-down-sports-logo'>
            <GiBaseballGlove size={30}/>
            <span>Baseball</span>
        </div>
        <div className='drop-down-sports-logo'>
            <TbBallBaseball size={30}/>
            <span>Softball</span>
        </div>
        <div className='drop-down-sports-logo'>
            <GiAmericanFootballPlayer size={30}/>
            <span>Football</span>
        </div>
        <div className='drop-down-sports-logo'>
            <GiSoccerField size={30}/>
            <span>Soccer</span>
        </div>
        <div className='drop-down-sports-logo'>
            <GiBasketballJersey size={30}/>
            <span>Basketball</span>
        </div>
        <div className='drop-down-sports-logo'>
            <MdSportsKabaddi size={30}/>
            <span>Lacrosse</span>
        </div>
        <div className='drop-down-sports-logo'>
            <TbBallVolleyball size={30}/>
            <span>Volleyball</span>
        </div>
        <div className='drop-down-sports-logo'>
            <GiBowlingStrike size={30}/>
            <span>Bowling</span>
        </div>
        <div className='drop-down-sports-logo'>
            <span style={{marginLeft: '0'}}>More coming soon!</span>
        </div>
    </div>
  )
}

export default SportsDropDown