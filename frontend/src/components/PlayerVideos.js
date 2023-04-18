import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import AddVideo from './AddVideo'
import TabSpinner from './TabSpinner'

function PlayerVideos() {

  const {teamId, playerId} = useParams()

  const [addVideo, setAddVideo] = useState(false)
  const [videos, setVideos] = useState([])
  const [hasVideos, setHasVideos] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [shouldDisplay, setShouldDisplay] = useState(null)

  useEffect(()=>{
    setShouldDisplay(addVideo ? 'none' : 'block')
  }, [addVideo])

  useEffect(()=> {
    async function fetchData(){
      const response = await fetch(
        `http://localhost:2121/dashboard/team/${teamId}/player/${playerId}/getPlayerVideos`, 
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

  const playerVideos = videos.map((item) => {
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
    page='player-profile'
    />

    {isLoading ? <TabSpinner /> : (
      hasVideos ? (
        <>
          <section style={{display: shouldDisplay}} className='player-videos-container'>
            <div className='team-videos'>
              {playerVideos}
            </div>
            <div className='add-video-btn-container'>
                <button onClick={() => setAddVideo(true)}>Add Video</button>
            </div>
          </section>
        </>
      ) : (
        <div className='player-videos-container'>
          <section className='no-data-added-container dashboard-tabs'>
              <h4>No Player Videos</h4>
              <button onClick={() => setAddVideo(true)}>Add Video</button>
          </section>
        </div>
      )
    )}
    </>
  )
}

export default PlayerVideos