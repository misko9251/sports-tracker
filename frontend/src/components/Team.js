import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {HiOutlineUserAdd} from 'react-icons/hi'
import AddStaff from './AddStaff'
import AddPlayer from './AddPlayer'

function Team() {

    const {teamId} = useParams()

    const [addStaff, setAddStaff] = useState(false)
    const [addPlayer, setAddPlayer] = useState(false)
    const [staffMembers, setStaffMembers] = useState([])
    const [players, setPlayers] = useState([])
    const [shouldDisplay, setShouldDisplay] = useState('block')
    console.log(addPlayer)

    useEffect(() => {
        setShouldDisplay(addStaff || addPlayer ? "none" : "block");
      }, [addStaff, addPlayer]);

    useEffect(()=> {
        async function fetchData(){
            const response = await fetch(
                `http://localhost:2121/dashboard/getTeamInfo/${teamId}`,
                {credentials: 'include'}
            )
            const json = await response.json()
            setStaffMembers(json.staffMembers)
            setPlayers(json.roster)
        }
        fetchData()
    }, [staffMembers, players])

    const closeAddStaff = () => {
        setAddStaff(false)
    }

    const closeAddPlayer = () => {
        setAddPlayer(false)
    }

    const allStaffMembers = staffMembers.map((item)=> {
        return (
            <span>{item.name}</span>
        )
    })

    const myRoster = players.map((item)=> {
        return (
            <span>{item.player}</span>
        )
    })

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

            <div style={{display: shouldDisplay}} className='staff-container'>
                <span>
                    <button onClick={()=> setAddStaff(true)}className='team-tab-btn'><HiOutlineUserAdd style={{marginRight: '10px'}} size={30}/>Add Staff</button>
                </span>
                {allStaffMembers}
            </div>

            <div style={{display: shouldDisplay}} className='team-container'>
                <span>
                    <button onClick={()=> setAddPlayer(true)}className='team-tab-btn'><HiOutlineUserAdd style={{marginRight: '10px'}} size={30}/>Add Player</button>
                </span>
                {myRoster}
            </div>


      </section>
    )
}

export default Team