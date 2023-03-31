import React from 'react'
import {useParams} from 'react-router-dom'
import Hockey from './Hockey'
import Basketball from './Basketball'

function SportsLogger() {

    const {teamId, sportType} = useParams()

    return (
      <section>
        {sportType == 'hockey' ? <Hockey /> : 
         sportType == 'basketball' ? <Basketball /> : ''}
      </section>
    )
}

export default SportsLogger