import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import React from 'react';

// components
import Home from './pages/home/Home';
import Register from './pages/register/Register';
import Login from './pages/login/Login'
import Navbar from './components/navbar/Navbar';
import { UserContext } from './context/userContext';

function App() {
  const {user} = useContext(UserContext);
  console.log(user)
  return (

    <BrowserRouter>
      <Navbar />
      <Routes>
          <Route path='/' element={user ? <Home /> : <Register />}/>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;