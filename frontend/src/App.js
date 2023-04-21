import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import React from 'react';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import io from 'socket.io-client';

// components
import Home from './pages/home/Home';
import Register from './pages/register/Register';
import Login from './pages/login/Login'
import Navbar from './components/navbar/Navbar';
import { UserContext } from './context/userContext';
import { SocketContext } from './context/socketContext';
import NotFound from './pages/notfound/NotFound';

function App() {
  const { user, setUser } = useContext(UserContext);
  const { setSocket } = useContext(SocketContext)
  const [userLoading, setUserLoading] = useState(true)

  useEffect(() => {
    let newSocket;
    if (user) {
      newSocket = io('http://localhost:4000', {
        query: { username: user.username }
      })

      newSocket.on('connect', () => {
        setSocket(newSocket)
        console.log('connected to socket')
      })
    }
    return () => {
      if (newSocket) {
        newSocket.disconnect()
      }
    }
  }, [user])

  useEffect(() => {
    const fetchUser = async () => {
      const token = Cookies.get('jwt')
      if (token) {
        const decoded = jwt_decode(token)
        const userId = decoded.id
        const response = await fetch(`http://localhost:4000/api/users/${userId}`)
        const json = await response.json()
        setUser(json)
      }
      setUserLoading(false)
    }

    fetchUser()
  }, [])

  return (

    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={userLoading ? <></> : (user ? <Home /> : <Register />)} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
