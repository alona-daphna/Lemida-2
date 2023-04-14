import React, { useContext } from 'react'
import './navbar.css'
import { UserContext } from '../../context/userContext';
import { ChosenChatContext } from '../../context/chosenChatContext';
import { ChatContext } from '../../context/chatListContext';

const Navbar = () => {
  const { user, setUser } = useContext(UserContext)
  const { setChosenChat } = useContext(ChosenChatContext)
  const { dispatch: setChatlist } = useContext(ChatContext)

  const handleLogout = async () => {
    const response = await fetch('http://localhost:4000/api/auth/logout', {
      credentials: 'include'
    })
    if (response.ok) {
      setUser(null)
      setChosenChat(null)
      setChatlist({
        type: 'SET_CHATS',
        payload: []
      })
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