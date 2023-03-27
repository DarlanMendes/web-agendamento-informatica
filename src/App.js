import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login'
import Home from './pages/Home'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';
import Loading from './components/Loading';

export const LoadingContext = createContext()

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoading, setIsLoading] = useState()
  const navigate = useNavigate()
  const auth = getAuth()

  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      if (user) {

        setCurrentUser(user)

        navigate('/home')
      } else {
        navigate('/')
      }
    })


  }, [])
  return (

    <div className="App">
      <LoadingContext.Provider value={{isLoading,setIsLoading}}>
        <Loading/>
        {currentUser && <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />}

        <Routes>
          <Route path='/home' element={<Home currentUser={currentUser} />} />
          <Route path='/' element={<Login />} />
        </Routes>
      </LoadingContext.Provider>

    </div>

  );
}

export default App;
