import React, {useState} from 'react'
import {HiOutlineUserAdd} from 'react-icons/hi'
import AddStaff from './AddStaff'
import AddPlayer from './AddPlayer'

function Team() {

    const [addStaff, setAddStaff] = useState(false)
    const [addPlayer, setAddPlayer] = useState(false)

    const closeAddStaff = () => {
        setAddStaff(false)
    }

    const closeAddPlayer = () => {
        setAddPlayer(false)
    }

    return (
      <section className='team-tab dashboard-tabs'>

        <AddStaff
        onClose={closeAddStaff}
        isActive={addStaff}
        />

        <AddPlayer 
        onClose={closeAddPlayer}
        isActive={addPlayer}
        />

            <div className='staff-container'>
                <span>
                    <button onClick={()=> setAddStaff(true)}className='team-tab-btn'><HiOutlineUserAdd style={{marginRight: '10px'}} size={30}/>Add Staff</button>
                </span>
                <span>Matt Misko</span>
            </div>

            <div>
                <span className='team-container'>
                    <button onClick={()=> setAddPlayer(true)}className='team-tab-btn'><HiOutlineUserAdd style={{marginRight: '10px'}} size={30}/>Add Player</button>
                </span>
            </div>


      </section>
    )
}

export default Team