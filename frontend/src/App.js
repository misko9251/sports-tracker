import './App.css';
import {Routes, Route, useLocation} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'


function App() {
  const location = useLocation()
  return (
    <div className="App">
      {location.pathname !== '/login' && <Navbar />}
      <Routes>
        <Route path='/' element={<Home/>}/> 
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;