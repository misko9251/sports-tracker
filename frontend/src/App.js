import './App.css';
import {Routes, Route, useLocation, BrowserRouter as Router} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import TeamProfile from './pages/TeamProfile'
import GetUser from './components/GetUser'
import PlayerProfile from './pages/PlayerProfile';
import SportsLogger from './components/sports-logging/SportsLogger';
import AuthProvider from './context/AuthContext';
import ProtectedRoutes from './components/ProtectedRoutes';

function App() {
  const location = useLocation()

  return (
    <div className="App">
      <AuthProvider >
          {
          location.pathname !== '/login' && 
          location.pathname !== '/register' && 
          location.pathname !== '/getUser' && 
          !location.pathname.startsWith('/dashboard') &&
          !location.pathname.startsWith('/profile') &&
          <Navbar />
          }
            <Routes>
              <Route path='/' element={<Home/>}/> 
              <Route path='/login' element={<Login/>}/>
              <Route path='/register' element={<Register/>}/>
              <Route element={<ProtectedRoutes />}>
                  <Route path='/getUser' element={<GetUser/>}/>
                  <Route path='/dashboard/:teamId' element={<TeamProfile />} />
                  <Route path='/dashboard/team/:teamId/profile/:playerId' element={<PlayerProfile />} />
                  <Route path='/dashboard/team/:teamId/sport/:sportType/event/:eventId' element={<SportsLogger />} />
              </Route>
            </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;