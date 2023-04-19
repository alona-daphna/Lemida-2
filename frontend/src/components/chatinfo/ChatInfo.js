import './chatinfo.css'
import { IoArrowBack } from 'react-icons/io5';

import React from 'react'

const ChatInfo = ({ setShowChatInfo }) => {
  return (
    <div className="chat-info">
      <button className="back-button" onClick={() => setShowChatInfo(false)}><IoArrowBack /></button>
      <div>ChatInfo</div>
    </div>
  )
}

export default ChatInfo