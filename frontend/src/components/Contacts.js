import React, {useState} from 'react'
import TabSpinner from './TabSpinner'
import AddContact from './AddContact'

function Contacts() {
    
    const [isLoading, setIsLoading] = useState(false)
    const [hasContacts, setHasContacts] = useState(false)
    const [addContact, setAddContact] = useState(false)

    const closeForm = () => {
        setAddContact(false)
    }
    
    return (
      <>

      <AddContact 
      isActive={addContact}
      onClose={closeForm}
      />


      {isLoading ? <TabSpinner /> : (
        hasContacts ? (
            <>
            <h1>Contacts</h1>
            </>
        ) : (
            <div className='player-videos-container'>
            <section className='no-data-added-container dashboard-tabs'>
                <h4>No Contacts</h4>
                <button onClick={() => setAddContact(true)}>Add Contact</button>
            </section>
          </div>
        )
      ) }
      </>
    )
}

export default Contacts