import React, {useState} from 'react'
import {AiOutlineCloseSquare} from 'react-icons/ai'
import {useParams} from 'react-router-dom'

function AddVideo(props) {
  
  const {teamId} = useParams()

  const [formData, setFormData] = useState({
    description: '',
  })

  const [fileInputState, setFileInputState] = useState('');
  const [previewSource, setPreviewSource] = useState('');

  const onChange = async (e) => {
    setFormData((prevVal)=> {
        return{
            ...prevVal,
            [e.target.name]: e.target.value
        }
    })
    const file = e.target.files[0];
    previewFile(file);
  }

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
        setPreviewSource(reader.result);
    };
};

  const onSubmit = async (e) => {
    e.preventDefault()
    if(props.page == 'team-profile'){
      const response = await fetch(`http://localhost:2121/dashboard/addVideo/${teamId}`, {
        credentials: 'include',
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({...formData, previewSource})
    })
    const json = await response.json()
    }else{
      const response = await fetch('', {
        credentials: 'include',
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({...formData, previewSource})
      })
    }
  }
    
  return (
    <div className={`add-video-container ${props.isActive ? `active` : ''}`}>
        <form onSubmit={onSubmit} className='add-player-form add-team-form'>
            <span className='close-staff-form' onClick={props.onClose}>{<AiOutlineCloseSquare/>}</span>
            <label>Add a Video Description</label>
            <input
            placeholder='Describe your video in a few words'
            type='text'
            name='description'
            className='add-staff-input'
            onChange={onChange}
            />
            <label>Video</label>
            <input
            id='fileInput'
            type='file'
            name='video'
            className='add-staff-input'
            onChange={onChange}
            />
            <button style={{marginTop: '2%'}}className='submit-new-player-btn'>Submit</button>
        </form>
    </div>
  )
}

export default AddVideo