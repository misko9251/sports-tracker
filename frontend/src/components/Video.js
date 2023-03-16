import React, {useState, useEffect} from 'react'
import AddVideo from './AddVideo'
import {useParams} from 'react-router-dom'
import TabSpinner from './TabSpinner'

export default function Video() {

    const {teamId} = useParams()

    const [addVideo, setAddVideo] = useState(false)
    const [hasVideos, setHasVideos] = useState(false)
    const [videos, setVideos] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    console.log(videos)

    useEffect(()=> {
        async function fetchData(){
            const response = await fetch(
                `http://localhost:2121/dashboard/getVideos/${teamId}`,
                {credentials: 'include'}
            )
            const json = await response.json()
            setVideos(json.videos)
            if(json.videos.length > 0){
                setHasVideos(true)
            }
            setIsLoading(false)
        }
        fetchData()
    }, [videos])    

    const closeAddVideo = () => {
        setAddVideo(false)
    }

    const teamVideos = videos.map((item)=> {
        return (
            <div className='individual-team-video'>
                <h4>{item.description}</h4>
                <video controls>
                    <source src={item.url} />
                </video>
            </div>
        )
    })

    return (
        <>
            <AddVideo
            onClose={closeAddVideo}
            isActive={addVideo}
            />

            {isLoading ? <TabSpinner /> : (
                hasVideos ? (
                    <section className='team-videos'>
                        {teamVideos}
                        {/* <button onClick={() => setAddVideo(true)}>Add Video</button> */}
                    </section>
                ) : (
                    <section className='no-data-added-container dashboard-tabs'>
                        <h4>No Team Videos</h4>
                        <button onClick={() => setAddVideo(true)}>Add Video</button>
                    </section>
                )
            )}
        </>
    )
}
