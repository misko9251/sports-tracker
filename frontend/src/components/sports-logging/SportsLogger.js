import React from 'react'
import {useParams} from 'react-router-dom'
import Hockey from './Hockey'
import Basketball from './Basketball'
import Football from './Football'
import Soccer from './Soccer'

function SportsLogger() {

    const {teamId, sportType} = useParams()
    console.log(sportType)

    return (
      <section>
        {sportType == 'hockey' ? <Hockey /> : 
         sportType == 'basketball' ? <Basketball /> : 
         sportType == 'football' ? <Football /> : 
         sportType == 'soccer' ? <Soccer /> : ''}
      </section>
    )
}

export default SportsLogger