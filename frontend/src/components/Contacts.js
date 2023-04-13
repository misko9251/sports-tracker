import React, {useState} from 'react'
import TabSpinner from './TabSpinner'

function Contacts() {
    
    const [isLoading, setIsLoading] = useState(false)
    
    return (
      <>
      {isLoading ? <TabSpinner /> : 
      <h1>testing</h1>}
      </>
    )
}

export default Contacts