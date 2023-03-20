import React, {useState} from 'react'
import AddVideo from './AddVideo'
import TabSpinner from './TabSpinner'

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
    page='player-profile'
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