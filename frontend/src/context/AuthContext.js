import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = React.createContext();

function AuthProvider(props) {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch('http://localhost:2121/auth/isAuthenticated', {credentials: 'include'});
        const data = await response.json();
        setIsAuthenticated(data.isAuthenticated)
        setLoading(false)
      } catch (error) {
        console.log(error);
      }
    }
    checkAuth();
  }, []); 

  const redirect = () => {
    navigate('/')
  }

  const logout = async () => {
    try {
      redirect()
       const response = await fetch('http://localhost:2121/auth/logout', {credentials: 'include'}) 
       const data = await response.json()
       setIsAuthenticated(false)
    } catch (error) {
        console.log(error)
    }
  }


  return (
    <AuthContext.Provider value={{isAuthenticated, logout, loading}}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider