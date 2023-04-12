import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import React from 'react';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';

// components
import Home from './pages/home/Home';
import Register from './pages/register/Register';
import Login from './pages/login/Login'
import Navbar from './components/navbar/Navbar';
import { UserContext } from './context/userContext';
import NotFound from './pages/notfound/NotFound';
import Loading from './pages/loading/Loading';

function App() {
  const {user, setUser} = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      const token = Cookies.get('jwt')
      if (token) {
        const decoded = jwt_decode(token)
        const userId = decoded.id
        const response = await fetch(`http://localhost:4000/api/users/${userId}`)
        const json = await response.json()
        setUser(json)
        setTimeout(() => {
          setIsLoading(false)
        }, 1500)
      }  
    }

    fetchUser()
  }, [])

  return (

    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={isLoading ? <Loading /> : user ? <Home /> : <Register />}/>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='loading' element={<Loading />} />
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;