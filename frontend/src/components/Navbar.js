import React, {useState} from 'react'
import NavLogo from '../assets/logo.png'
import SportsDropDown from './SportsDropDown'
import {Link} from 'react-router-dom'

function Navbar() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <nav className='navBar'>
        <Link to='/'>
          <span className='logo-container'>
            <img src={NavLogo} alt='sports logo'/>
          </span>
        </Link>
        <ul>
          <li 
          onMouseEnter={()=> setIsHovered(true)}
          onMouseLeave={()=> setIsHovered(false)}
          style={{cursor: 'pointer'}}
          >Sports
          </li>
          {isHovered && <SportsDropDown />}
          <li>Features</li>
          <Link style={{textDecoration: 'none', color: 'white'}} to='/login'>
            <li>Sign In</li>
          </Link>
        </ul>
    </nav>
  )
}

export default Navbar