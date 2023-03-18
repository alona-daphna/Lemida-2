import React from 'react'
import './home.css'

// components
import Chat from '../../components/chat/Chat'
import Conversations from '../../components/conversations/Conversations'

const Home = () => {
  return (
    <div>
        <div className="container">
            <Conversations />
            <Chat />
        </div>
    </div>
  )
}

export default Home