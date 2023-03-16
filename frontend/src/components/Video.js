import React, {useState, useEffect} from 'react'
import AddVideo from './AddVideo'
import {useParams} from 'react-router-dom'

export default function Video() {

    const {teamId} = useParams()

    const [addVideo, setAddVideo] = useState(false)
    const [videos, setVideos] = useState([])

    useEffect(()=> {
        async function fetchData(){
            const response = await fetch(
                `http://localhost:2121/dashboard/getVideos/${teamId}`,
                {credentials: 'include'}
            )
            const json = await response.json()
        }
        fetchData()
    }, [videos])    

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
