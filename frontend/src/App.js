import './App.css';
import {Routes, Route, useLocation} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import GetUser from './components/GetUser'


function App() {
  const location = useLocation()
  return (
    <div className="App">
      {
      location.pathname !== '/login' && 
      location.pathname !== '/register' && 
      location.pathname !== '/getUser' && 
      <Navbar />
      }
      <Routes>
        <Route path='/' element={<Home/>}/> 
        <Route path='/login' element={<Login/>}/>
        <Route path='register' element={<Register/>}/>
        <Route path='/getUser' element={<GetUser/>}/>
      </Routes>
    </div>
  );
}

export default App;