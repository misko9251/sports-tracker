import './App.css';
import {Routes, Route, useLocation} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'


function App() {
  const location = useLocation()
  return (
    <div className="App">
      {location.pathname !== '/login' && location.pathname !== '/register' && <Navbar />}
      <Routes>
        <Route path='/' element={<Home/>}/> 
        <Route path='/login' element={<Login/>}/>
        <Route path='register' element={<Register/>}/>
      </Routes>
    </div>
  );
}

export default App;