import React, {useEffect, useState} from 'react'
import {useParams, Link} from 'react-router-dom'
import {HiOutlineUserAdd} from 'react-icons/hi'
import {CiCircleRemove} from 'react-icons/ci'
import AddStaff from './AddStaff'
import AddPlayer from './AddPlayer'
import TabSpinner from './TabSpinner'


function Team() {

    const {teamId} = useParams()

    const [addStaff, setAddStaff] = useState(false)
    const [addPlayer, setAddPlayer] = useState(false)
    const [staffMembers, setStaffMembers] = useState([])
    const [players, setPlayers] = useState([])
    const [shouldDisplay, setShouldDisplay] = useState('block')
    const [isLoading, setIsLoading] = useState(true)

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
            setIsLoading(false)
        }
        fetchData()
    }, [staffMembers, players])

    const closeAddStaff = () => {
        setAddStaff(false)
    }

    const closeAddPlayer = () => {
        setAddPlayer(false)
    }

    const deleteStaffMember = async (id) => {
        try {
            const response = await fetch(`http://localhost:2121/dashboard/deleteStaff/${teamId}`, {
                credentials: 'include',
                method: 'DELETE',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({_id: id})
            })
            const json = await response.json()
            setPlayers((prevVal)=> prevVal.filter((item)=> item._id !== id))
        } catch (error) {
            console.log(error)
        }
    }

    const allStaffMembers = staffMembers.map((item)=> {
        return (
            <div className='staff-members'>
                <div className='staff-information'>
                    <span>{item.name}</span>
                    <span className='staff-title'>{item.title}</span>
                </div>
                <div 
                className='delete-staff'
                onClick={()=> deleteStaffMember(item._id)}
                >
                    <CiCircleRemove/>
                </div>
            </div>
        )
    })

    const myRoster = players.map((item)=> {
        return (
            <Link to={`/dashboard/team/${item.teamId}/profile/${item._id}`} className='custom-link-class'>
                <div className='roster-players'>{item.player}</div>
            </Link >
        )
    })

    return (
        <>
        {isLoading ? <TabSpinner /> : (
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
        )}
        </>
    )
}

export default Team