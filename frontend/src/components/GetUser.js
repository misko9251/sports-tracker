import React, {useState, useEffect} from 'react'

function GetUser() {

    const [isCoach, setIsCoach] = useState()
    const [isParent, setIsParent] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        async function fetchData(){
            try {
                const response = await fetch(
                    'http://localhost:2121/dashboard/getUser',
                    {credentials: 'include'}
                );
                const json = await response.json()
                console.log(json)
            } catch (error) {
                
            }
        }
        fetchData()
    }, [])

    return (
      <div>GetUser</div>
    )
}

export default GetUser