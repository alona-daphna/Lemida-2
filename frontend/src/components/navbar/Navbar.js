import React, { useContext } from 'react'
import './navbar.css'
import { UserContext } from '../../context/userContext';

const Navbar = () => {
  const { user, setUser } = useContext(UserContext)

  const handleLogout = async () => {
    const response = await fetch('http://localhost:4000/api/auth/logout', {
      credentials: 'include'
    })
    if (response.ok) {
      setUser(null)
    } else {
      console.log('Failed to logout')
    }
  }

  return (
    <div className='navbar-container'>
      <h3>Lemida</h3>
      <div className="navbar-right">
        <div>Dark/Light</div>
        {user &&
          <div className="logout">
            <button onClick={handleLogout}>Logout</button>
          </div>
        }
      </div>
    </div>
  )
}

export default Navbar