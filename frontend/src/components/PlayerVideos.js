import React, {useState} from 'react'
import AddVideo from './AddVideo'

function PlayerVideos() {

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

    <div className='player-videos-container'>
        <section className='no-data-added-container dashboard-tabs'>
            <h4>No Player Videos</h4>
            <button onClick={() => setAddVideo(true)}>Add Video</button>
        </section>
    </div>
    </>
  )
}

export default PlayerVideos