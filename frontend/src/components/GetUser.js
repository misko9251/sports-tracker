import React, {useState, useEffect} from 'react'
import Questionnaire from '../pages/Questionnaire'
import Dashboard from '../pages/Dashboard'

function GetUser() {

    const [isCoach, setIsCoach] = useState()
    const [isParent, setIsParent] = useState()

    useEffect(()=>{
        async function fetchData(){
            try {
                const response = await fetch(
                    'http://localhost:2121/dashboard/getUser',
                    {credentials: 'include'}
                );
                const json = await response.json()
                setIsParent(json.isRegisteredParent)
                setIsCoach(json.isRegisteredCoach)
            } catch (error) {
                
            }
        }
        fetchData()
    }, [])

    return (
      <>
        {isCoach || isParent ? <Dashboard/> : <Questionnaire/>}
      </>
    )
}

export default GetUser