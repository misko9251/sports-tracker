import React, {useState} from 'react'
import {AiOutlineCloseSquare} from 'react-icons/ai'

function AddPlayer(props) {

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
    const response = await fetch('http://localhost:2121/dashboard/addPlayer')
  } 

  return (
    <div className={`add-player-container ${props.isActive ? 'active show' : ''}` }>
    <form onSubmit={onSubmit} className='add-staff-form add-team-form'>
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
        placeholder='e.g. Coach'
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
        onChange={onChange}
        value={fileInputState}
        />
        <button style={{marginTop: '2%'}}className='submit-new-player-btn'>Submit</button>
    </form>
</div>
  )
}

export default AddPlayer