import React from 'react'
import {useParams} from 'react-router-dom'
import Hockey from './Hockey'

function SportsLogger() {

    const {teamId, sportType} = useParams()

    return (
      <section>
        {sportType == 'hockey' ? <Hockey /> : ''}
      </section>
    )
}

export default SportsLogger