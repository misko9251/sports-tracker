import React, {useState, useContext, useEffect} from 'react'
import NavLogo from '../assets/logo.png'
import SportsDropDown from './SportsDropDown'
import {Link} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'

function Navbar() {
  const [isHovered, setIsHovered] = useState(false)
  const {isAuthenticated, logout, loading} = useContext(AuthContext)

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
          {
          loading ? <div class="lds-circle"><div></div></div> :
          isAuthenticated ? <li onClick={() => logout()}>Logout</li> : // use isLoggedIn instead of isAuthenticated
           <Link style={{textDecoration: 'none', color: 'white'}} to='/login'>
             <li>Sign In</li>
           </Link>
          }
        </ul>
    </nav>
  )
}


export default Navbar