import React, {useState} from 'react'
import {useParams} from 'react-router-dom'
import {AiOutlineCloseSquare} from 'react-icons/ai'

function AddPlayer(props) {

  const {teamId} = useParams()

  const [formData, setFormData] = useState({
    name: '',
    position: '',
  })  

  const [fileInputState, setFileInputState] = useState('');
  const [previewSource, setPreviewSource] = useState('');

  const onChange = (e) => {
    setFormData((prevVal)=> {
        return {
            ...prevVal,
            [e.target.name]: e.target.value
        }
    })
    const file = e.target.files[0];
    previewFile(file);
    console.log(e.target.file)
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
    const response = await fetch(`http://localhost:2121/dashboard/addPlayer/${teamId}`, {
        credentials: 'include',
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({...formData, previewSource})
    })
    const json = await response.json()
    props.onClose()
    setFormData({name: '', position: ''})
    e.target.reset()

  } 

  return (
    <div className={`add-player-container ${props.isActive ? 'active show' : ''}` }>
    <form onSubmit={onSubmit} className='add-player-form add-team-form'>
        <span className='close-staff-form' onClick={props.onClose}>{<AiOutlineCloseSquare/>}</span>
        <label>Add Player</label>
        <input
        placeholder='Enter name'
        className='add-staff-input'
        type='text'
        onChange={onChange}
        value={formData.name}
        name='name'
        />
        <label>Position</label>
        <input
        placeholder='e.g. Pitcher'
        className='add-staff-input'
        type='text'
        onChange={onChange}
        value={formData.position}
        name='position'
        />
        <label>Player Image</label>
        <input
        id='fileInput'
        type='file'
        name='image'
        onChange={onChange}
        className='form-input'
        />
        
        <button style={{marginTop: '2%'}}className='submit-new-player-btn'>Submit</button>
    </form>
</div>
  )
}

export default AddPlayer