import React from 'react'
import {useParams} from 'react-router-dom'
import Hockey from './Hockey'
import Basketball from './Basketball'
import Football from './Football'

function SportsLogger() {

    const {teamId, sportType} = useParams()

    return (
      <section>
        {sportType == 'hockey' ? <Hockey /> : 
         sportType == 'basketball' ? <Basketball /> : 
         sportType == 'football' ? <Football /> : ''}
      </section>
    )
}

export default SportsLogger