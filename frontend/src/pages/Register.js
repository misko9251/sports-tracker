import React, {useState} from 'react'
import RegisterPhoto from '../assets/register.png'
import {FcSportsMode} from 'react-icons/fc'
import {FcGoogle} from 'react-icons/fc'
import {Link} from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {

    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        password2: ''
    })

    const onChange = (e) => {
        setFormData((prevVal)=> {
            return {
                ...prevVal,
                [e.target.name]: e.target.value
            }
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        const formInfo = {
            credentials: 'include',
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        }
        const response = await fetch('http://localhost:2121/auth/register', formInfo)
        const data = await response.json()
        if(!response.ok){
            data.forEach(error => {
                toast.info(error.msg, {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  theme: 'dark'
                });
            });
        }
    }

    return (
      <div className='login-register-container'>
      <section className='login-register-section'>
          <div className='login-register-form-section'>
              {/* <Link to='/'><FcSportsMode size={50} style={{marginBottom: '5%'}}/> </Link> */}
              <h5>Register</h5>
              <p>Thanks for joining us!</p>
              <button><FcGoogle size={20} style={{marginRight: '3%'}}/>Sign up with Google</button>
              <span>or Sign up with Email</span>
              <form onSubmit={onSubmit}>
                  <label>Email*</label>
                  <input
                  placeholder='example@example.com'
                  type='text'
                  name='email'
                  onChange={onChange}
                  value={formData.email}
                  />
                  <label>Username*</label>
                  <input
                  placeholder='example@example.com'
                  type='text'
                  name='username'
                  onChange={onChange}
                  value={formData.username}
                  />
                  <label>Password*</label>
                  <input
                  placeholder='Min. 6 characters'
                  type='password'
                  name='password'
                  onChange={onChange}
                  value={formData.password}
                  />
                  <label>Confirm Password*</label>
                  <input
                  placeholder='Confirm password'
                  type='password'
                  name='password2'
                  onChange={onChange}
                  value={formData.password2}
                  />
                  <button>Register</button>
              </form>
              <p>Already registered? <Link to='/login' style={{textDecoration: 'none', color: '#429488', fontWeight: 'bold'}}>Login</Link></p>
          </div>
      </section>
      <section className='login-register-section login-register-img'>
          <img src={RegisterPhoto} alt='kids playing sports'/>
      </section>
      <ToastContainer />
    </div>
  )
}

export default Register