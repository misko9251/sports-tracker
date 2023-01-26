import React, {useState} from 'react'
import NavLogo from '../assets/logo.png'
import SportsDropDown from './SportsDropDown'

function Navbar() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <nav className='navBar'>
        <span className='logo-container'>
          <img src={NavLogo} alt='sports logo'/>
        </span>
        <ul>
          <li 
          onMouseEnter={()=> setIsHovered(true)}
          onMouseLeave={()=> setIsHovered(false)}
          style={{cursor: 'pointer'}}
          >Sports
          </li>
          {isHovered && <SportsDropDown />}
          <li>Features</li>
          <li>Sign In</li>
        </ul>
    </nav>
  )
}

export default Navbar