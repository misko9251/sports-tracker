import React, {useState} from 'react'
import LoginPhoto from '../assets/login.png'
import {FcSportsMode} from 'react-icons/fc'
import {FcGoogle} from 'react-icons/fc'
import {Link} from 'react-router-dom'

function Login() {
  
  const [formData, setFormData] = useState({username: '', password: ''})

  return (
    <div className='login-register-container'>
        <section className='login-register-section'>
            <div className='login-register-form-section'>
                <Link to='/'><FcSportsMode size={50} style={{marginBottom: '5%'}}/> </Link>
                <h5>Login</h5>
                <p>Welcome back, hope the game was great!</p>
                <button><FcGoogle size={20} style={{marginRight: '3%'}}/>Sign in with Google</button>
                <span>or Sign in with Email</span>
                <form>
                    <label>Email*</label>
                    <input
                    placeholder='example@example.com'
                    type='text'
                    />
                    <label>Password*</label>
                    <input
                    placeholder='Min. 6 characters'
                    type='password'
                    />
                    <button>Login</button>
                </form>
                <p>Not registered yet? <Link to='/register' style={{textDecoration: 'none', color: '#429488', fontWeight: 'bold'}}>Create an Account</Link></p>
            </div>
        </section>
        <section className='login-register-section'>
            <img src={LoginPhoto}/>
        </section>
    </div>
  )
}

export default Login