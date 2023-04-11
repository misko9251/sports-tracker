import React from 'react'
import SadBall from '../../assets/sadBall.png'
import {useNavigate} from 'react-router-dom'
import {useParams} from 'react-router-dom'

function EmptyRoster() {

    const navigate = useNavigate();
    const {teamId, eventId} = useParams()

    return (
        <div>
            <div className='empty-roster-container'>
                <h1>Oh no! You forgot to set your roster!</h1>
                <div className='empty-roster-img'>
                    <img src={SadBall} />
                </div>
                <button onClick={()=>navigate(`/dashboard/${teamId}`)}>Back to Dashboard</button>
            </div>
        </div>
  ) 
}

export default EmptyRoster