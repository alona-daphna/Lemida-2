import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

// components
import Home from './pages/home/Home';
import Register from './pages/register/Register';
import Login from './pages/login/Login'
import Navbar from './components/navbar/Navbar';

function App() {
  const [user, setUser] = useState(true);

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