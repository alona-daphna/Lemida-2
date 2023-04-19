import React, { useState, useEffect, useContext } from 'react'
import './home.css'

import Chat from '../../components/chat/Chat'
import Conversations from '../../components/conversations/Conversations'
import { ChosenChatContext } from '../../context/chosenChatContext';
import ChatForm from '../../components/chatform/ChatForm';
import ChatInfo from '../../components/chatinfo/ChatInfo';

const Home = () => {

    const [showConversations, setShowConversations] = useState(true);
    const [showChatForm, setShowChatForm] = useState(false)
    const [showChatInfo, setShowChatInfo] = useState(false)
    const [isSmallScreen, setIsSmallScreen] = useState(window.matchMedia('(max-width: 650px)').matches);
    const { setChosenChat } = useContext(ChosenChatContext)

    const handleConversationClick = () => {
        setShowConversations(false);
    };

    const handleBackClick = () => {
        setShowConversations(true);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 650);
        };

        function handleEscPress(event) {
            if (event.keyCode === 27) {
                handleBackClick();
                setChosenChat(null);
            }
        }
      
        handleResize();
        document.addEventListener('keydown', handleEscPress);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('keydown', handleEscPress);
        };
    }, []);

    return (
        <div className={showChatForm ? "" : "container"}>
            {showChatForm ? <ChatForm setShowChatForm={setShowChatForm} /> : showChatInfo ? <ChatInfo setShowChatInfo={setShowChatInfo}/> :
                isSmallScreen ? (
                    showConversations ? (
                        <Conversations onConversationClick={handleConversationClick} setShowChatForm={setShowChatForm} />
                    ) : (
                        <Chat onBackClick={handleBackClick} setShowChatInfo={setShowChatInfo}/>
                    )
                ) : (
                    <>
                        <Conversations onConversationClick={handleConversationClick} setShowChatForm={setShowChatForm} />
                        <Chat setShowChatInfo={setShowChatInfo}/>
                    </>
                )
            }
        </div>
    )
}

export default Home