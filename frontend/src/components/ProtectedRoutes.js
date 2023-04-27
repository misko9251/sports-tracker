import React, {useContext} from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom';
import Spinner from './Spinner';

function ProtectedRoutes() {
    
    const {isAuthenticated, logout, loading} = useContext(AuthContext)

    if (loading) {
      return <Spinner />
    }

    return (
        isAuthenticated ? <Outlet /> : <Navigate to='/login'/>
    )
}

export default ProtectedRoutes