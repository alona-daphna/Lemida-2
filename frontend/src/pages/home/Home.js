import React, { useState, useEffect, useContext } from 'react'
import './home.css'

import Chat from '../../components/chat/Chat'
import Conversations from '../../components/conversations/Conversations'
import { ChosenChatContext } from '../../context/chosenChatContext';
import ChatForm from '../../components/chatform/ChatForm';

const Home = () => {

    const [showConversations, setShowConversations] = useState(true);
    const [showChatForm, setShowChatForm] = useState(false)
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
      
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        function handleEscPress(event) {
            if (event.keyCode === 27) {
                if (showChatForm == true) {
                    setShowChatForm(false);
                } else {
                    handleBackClick();
                    setChosenChat(null);
                }
            }
        }
      
        document.addEventListener('keydown', handleEscPress);
        return () => {
            document.removeEventListener('keydown', handleEscPress);
        };
    }, [showChatForm]);

    return (
        <div className={showChatForm ? "" : "container"}>
            {showChatForm ? <ChatForm setShowChatForm={setShowChatForm} /> :
                isSmallScreen ? (
                    showConversations ? (
                        <Conversations onConversationClick={handleConversationClick} setShowChatForm={setShowChatForm} />
                    ) : (
                        <Chat onBackClick={handleBackClick} />
                    )
                ) : (
                    <>
                        <Conversations onConversationClick={handleConversationClick} setShowChatForm={setShowChatForm} />
                        <Chat />
                    </>
                )
            }
        </div>
    )
}

export default Home