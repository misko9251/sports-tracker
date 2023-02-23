import './App.css';
import {Routes, Route, useLocation} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import TeamProfile from './pages/TeamProfile'
import GetUser from './components/GetUser'


function App() {
  const location = useLocation()
  return (
    <div className="App">
      {
      location.pathname !== '/login' && 
      location.pathname !== '/register' && 
      location.pathname !== '/getUser' && 
      !location.pathname.startsWith('/dashboard') &&
      <Navbar />
      }
      <Routes>
        <Route path='/' element={<Home/>}/> 
        <Route path='/login' element={<Login/>}/>
        <Route path='register' element={<Register/>}/>
        <Route path='/getUser' element={<GetUser/>}/>
        <Route path="/dashboard/:teamId" element={<TeamProfile/>} />
      </Routes>
    </div>
  );
}

export default App;