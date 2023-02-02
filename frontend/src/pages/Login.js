import React, {useState} from 'react'
import LoginPhoto from '../assets/login.png'
import {FcSportsMode} from 'react-icons/fc'
import {FcGoogle} from 'react-icons/fc'
import {Link} from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  
    const [formData, setFormData] = useState({
        username: '', 
        password: ''
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
        try {
            const formInfo = {
                credentials: 'include',
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(formData)
            }
            const response = await fetch('http://localhost:2121/auth/login', formInfo)
            const json = await response.json()
            console.log(json)
            if(!(json.message == 'Success')){
                toast.info(json.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'dark'
                  });
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
      <div className='login-register-container'>
          <section className='login-register-section'>
              <div className='login-register-form-section'>
                  <Link to='/'><FcSportsMode size={50} style={{marginBottom: '5%'}}/> </Link>
                  <h5>Login</h5>
                  <p>Welcome back, hope the game was great!</p>
                  <button><FcGoogle size={20} style={{marginRight: '3%'}}/>Sign in with Google</button>
                  <span>or Sign in with Email</span>
                  <form onSubmit={onSubmit}>
                      <label>Email*</label>
                      <input
                      placeholder='example@example.com'
                      type='text'
                      name='email'
                      value={formData.email}
                      onChange={onChange}
                      />
                      <label>Password*</label>
                      <input
                      placeholder='Min. 6 characters'
                      type='password'
                      name='password'
                      value={formData.password}
                      onChange={onChange}
                      />
                      <button>Login</button>
                  </form>
                  <p>Not registered yet? <Link to='/register' style={{textDecoration: 'none', color: '#429488', fontWeight: 'bold'}}>Create an Account</Link></p>
              </div>
          </section>
          <section className='login-register-section login-register-img'>
              <img src={LoginPhoto} alt='kids playing sports'/>
          </section>
          <ToastContainer />
      </div>
  )
}

export default Login