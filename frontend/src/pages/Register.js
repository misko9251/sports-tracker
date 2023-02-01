import React, {useState} from 'react'
import RegisterPhoto from '../assets/register.png'
import {FcSportsMode} from 'react-icons/fc'
import {FcGoogle} from 'react-icons/fc'
import {Link} from 'react-router-dom'

function Register() {
  return (
    <div className='login-register-container'>
    <section className='login-register-section'>
        <div className='login-register-form-section'>
            <Link to='/'><FcSportsMode size={50} style={{marginBottom: '5%'}}/> </Link>
            <h5>Register</h5>
            <p>Thanks for joining us!</p>
            <button><FcGoogle size={20} style={{marginRight: '3%'}}/>Sign up with Google</button>
            <span>or Sign up with Email</span>
            <form>
                <label>Email*</label>
                <input
                placeholder='example@example.com'
                type='text'
                />
                <label>Username*</label>
                <input
                placeholder='example@example.com'
                type='text'
                />
                <label>Password*</label>
                <input
                placeholder='Min. 6 characters'
                type='password'
                />
                <label>Confirm Password*</label>
                <input
                placeholder='Confirm password'
                type='password'
                />
                <button>Register</button>
            </form>
            <p>Already registered? <Link to='/login' style={{textDecoration: 'none', color: '#429488', fontWeight: 'bold'}}>Login</Link></p>
        </div>
    </section>
    <section className='login-register-section login-register-img'>
        <img src={RegisterPhoto}/>
    </section>
</div>
  )
}

export default Register