import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import TabSpinner from './TabSpinner'

function TeamStats() {

    const {teamId} = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [completedGames, setCompletedGames] = useState([])
    
    useEffect(()=>{
        async function fetchData(){
            const response = await fetch(`http://localhost:2121/dashboard/getPastGames/${teamId}`, {
                credentials: 'include'
            })
            const json = await response.json()
            setCompletedGames(json.completedGames)
            setIsLoading(false)
            console.log(completedGames)
        }
        fetchData()
    }, [completedGames])

    const events = completedGames.map((event)=>{
        return (
            <div className='individual-events completed-game'>
                <h2>Opponent: {event.opponent}</h2>
                <span>Result: Loss</span>
            </div>
        )
    })

    return (
      <>
        {isLoading ? <TabSpinner /> : 
        <section>
            {events}    
        </section>}
      </>
    )
}

export default TeamStats