import {Route,Routes } from 'react-router-dom';
import Login from './pages/Login'
import Home from './pages/Home'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import { useEffect,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  const [currentUser, setCurrentUser]=useState(null)
  const navigate = useNavigate()
  const auth = getAuth()
  
  useEffect(()=>{
    
   onAuthStateChanged(auth,(user)=>{
      if(user){
      
        setCurrentUser(user)
        
        navigate('/home')
      }else{
        navigate('/')
      }
   })
    

  },[])
  return (
    <div className="App">
    {currentUser&&<Navbar currentUser={currentUser}/>}
    <Routes>
      <Route path='/home'element={<Home currentUser={currentUser}/>}/> 
      <Route path='/' element={<Login/>}/>
    </Routes>
    
    </div>
  );
}

export default App;
