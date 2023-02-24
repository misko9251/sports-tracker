import React from 'react'
import {HiOutlineUserAdd} from 'react-icons/hi'

function Team() {

    return (
      <section className='team-tab dashboard-tabs'>

        <div className='staff-container'>
            <span>
                <button className='team-tab-btn'><HiOutlineUserAdd style={{marginRight: '10px'}} size={30}/>Add Staff</button>
            </span>
            <span>Matt Misko</span>
        </div>

        <div>
            <span className='team-container'>
                <button className='team-tab-btn'><HiOutlineUserAdd style={{marginRight: '10px'}} size={30}/>Add Player</button>
            </span>
        </div>

      </section>
    )
}

export default Team