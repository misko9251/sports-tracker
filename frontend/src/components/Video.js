import React, {useState} from 'react'
import {useParams} from 'react-router-dom'
import AddVideo from './AddVideo'

export default function Video() {

    const [addVideo, setAddVideo] = useState(false)

    const closeAddVideo = () => {
        setAddVideo(false)
    }

    return (
        <>

            <AddVideo
            onClose={closeAddVideo}
            isActive={addVideo}
            />

            <section className='no-data-added-container dashboard-tabs'>
                <h4>No Team Videos</h4>
                <button onClick={() => setAddVideo(true)}>Add Video</button>
            </section>
            
        </>
    )
}
