import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import TabSpinner from './TabSpinner'
import AddContact from './AddContact'

function Contacts() {

    const {teamId, playerId} = useParams()
    
    const [isLoading, setIsLoading] = useState(true)
    const [hasContacts, setHasContacts] = useState(false)
    const [addContact, setAddContact] = useState(false)
    const [myContacts, setMyContacts] = useState([])

    useEffect(()=>{
        async function fetchData(){
            const response = await fetch(
                `http://localhost:2121/dashboard/team/${teamId}/player/${playerId}/getPlayerContacts`, 
                {credentials: 'include'}
            )
            const json = await response.json()
            setMyContacts(json.contacts)
            if(json.contacts.length > 0){
                setHasContacts(true)
            }
            setIsLoading(false)
        }
        fetchData()
    })

    const closeForm = () => {
        setAddContact(false)
    }

    const contacts = myContacts.map((contact)=>{
        return (
            <div className='individual-events individual-contact'>
                <div className='contact-name'>
                    <span>Contact: {contact.name}</span>
                    <span className='contact-relationship'>{contact.relationship}</span>
                </div>
                <span>Phone Number: {`${contact.phoneNumber.slice(0, 3)}-${contact.phoneNumber.slice(3, 6)}-${contact.phoneNumber.slice(6)}`}</span>
            </div>
        )
    })
    
    return (
      <>

      <AddContact 
      isActive={addContact}
      onClose={closeForm}
      />


      {isLoading ? <TabSpinner /> : (
        hasContacts ? (
            <>
            {contacts}
            <div className='contact-btn-container'>
                <button onClick={() => setAddContact(true)}>Add Contact</button>
            </div>
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