import React, {useState} from 'react'
import {HiOutlineUserAdd} from 'react-icons/hi'
import AddStaff from './AddStaff'

function Team() {

    const [addStaff, setAddStaff] = useState(false)

    const closeAddStaff = () => {
        setAddStaff(false)
    }

    return (
      <section className='team-tab dashboard-tabs'>

        <AddStaff
        onClose={closeAddStaff}
        isActive={addStaff}
        />

        <div className='staff-container'>
            <span>
                <button onClick={()=> setAddStaff(true)}className='team-tab-btn'><HiOutlineUserAdd style={{marginRight: '10px'}} size={30}/>Add Staff</button>
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