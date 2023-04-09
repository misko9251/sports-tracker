import React from 'react'
import {useParams} from 'react-router-dom'
import Hockey from './Hockey'
import Basketball from './Basketball'
import Football from './Football'
import Soccer from './Soccer'
import Volleyball from './Volleyball'
import Lacrosse from './Lacrosse'
import BaseballSoftball from './BaseballSoftball'

function SportsLogger() {

    const {teamId, sportType} = useParams()
    console.log(sportType)

    return (
      <section>
        {sportType == 'hockey' ? <Hockey /> : 
         sportType == 'basketball' ? <Basketball /> : 
         sportType == 'football' ? <Football /> : 
         sportType == 'soccer' ? <Soccer /> : 
         sportType == 'volleyball' ? <Volleyball /> : 
         sportType == 'lacrosse' ? <Lacrosse /> : 
         sportType == 'baseball' || 'softball' ? <BaseballSoftball /> : ''}
      </section>
    )
}

export default SportsLogger