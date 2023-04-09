import React, { useState, useEffect } from 'react'
import './home.css'

import Chat from '../../components/chat/Chat'
import Conversations from '../../components/conversations/Conversations'

const Home = () => {

    const [showConversations, setShowConversations] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(window.matchMedia('(max-width: 650px)').matches);

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