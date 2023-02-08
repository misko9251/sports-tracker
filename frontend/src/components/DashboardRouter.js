import React, {useState, useEffect} from 'react'
import Spinner from './Spinner'
import ParentDashboard from '../pages/ParentDashboard'
import CoachDashboard from '../pages/CoachDashboard'

function DashboardRouter() {

  const [isParent, setIsParent] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(()=> {
    async function fetchData(){
      try {
        const response = await fetch('http://localhost:2121/dashboard/getUser', {credentials: 'include'})
        const json = await response.json()
        setIsParent(json.isRegisteredParent)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : isParent === true ? (
        <ParentDashboard />
      ) : isParent === false ? (
        <CoachDashboard />
      ) : null}
    </div>
  );
}

export default DashboardRouter