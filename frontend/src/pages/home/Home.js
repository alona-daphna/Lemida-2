import React, { useState, useEffect } from 'react'
import './home.css'

import Chat from '../../components/chat/Chat'
import Conversations from '../../components/conversations/Conversations'

const Home = () => {

    const [showConversations, setShowConversations] = useState(true);
    const [isSmallScreen, setIsSmallScreen] = useState(window.matchMedia('(max-width: 650px)').matches);

    const handleConversationClick = () => {
        setShowConversations(false);
    };

    const handleBackClick = () => {
        setShowConversations(true);
    };

    useEffect(() => {
        const fetchConversations = async() => {
            const response = await fetch("http://localhost:4000/api/chats", {
                credentials: 'include'
            })
            const json = await response.json()
            console.log('Chats:', json)
        }

        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 650);
        };

        fetchConversations()
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="container">
            {
                isSmallScreen ? (
                    showConversations ? (
                        <Conversations onConversationClick={handleConversationClick} />
                    ) : (
                        <Chat onBackClick={handleBackClick} />
                    )
                ) : (
                    <>
                        <Conversations onConversationClick={handleConversationClick} />
                        <Chat />
                    </>
                )
            }
        </div>
    )
}

export default Home