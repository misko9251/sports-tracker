import React, {useState} from 'react'

export default function Video() {

    const [addVideo, setAddVideo] = useState(false)

    return (
      <section className='no-data-added-container dashboard-tabs'>
          <h4>No Team Videos</h4>
          <button onClick={() => setAddVideo(true)}>Add Video</button>
      </section>
    )
}
