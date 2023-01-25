import React from 'react'
import NavLogo from '../assets/logo.png'

function Navbar() {
  return (
    <nav className='navBar'>
        <span className='logo-container'>
          <img src={NavLogo} alt='sports logo'/>
        </span>
        <ul>
          <li>Sports</li>
          <li>Features</li>
          <li>Sign In</li>
        </ul>
    </nav>
  )
}

export default Navbar