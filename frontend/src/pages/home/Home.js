import React, { useState, useEffect } from 'react'
import './home.css'

import Chat from '../../components/chat/Chat'
import Conversations from '../../components/conversations/Conversations'

const Home = () => {

    const [showConversations, setShowConversations] = useState(true);
    const [isSmallScreen, setIsSmallScreen] = useState(window.matchMedia('(max-width: 650px)').matches);
    const [conversations, setConversations] = useState([])

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
            const chatsJson = await response.json()

            const chatsFiltered = chatsJson.map(chat => {
                const lastMessage = chat.message_history.slice(-1)[0];
                const date = lastMessage ? new Date(lastMessage.createdAt) : "";
                const hour = date ? date.getHours().toString().padStart(2, "0") : "";
                const minute = date ? date.getMinutes().toString().padStart(2, "0") : "";
                return {
                    "name": chat.name,
                    "lastMsg": lastMessage ? lastMessage.text : "",
                    "time": date ? `${hour}:${minute}` : "",
                    // To change to real images
                    "picture": chat.name==="Ido" ? "https://shorturl.at/dfpzV" : ""
                };
            });

            setConversations(chatsFiltered)
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
                        <Conversations conversations={conversations} onConversationClick={handleConversationClick} />
                    ) : (
                        <Chat onBackClick={handleBackClick} />
                    )
                ) : (
                    <>
                        <Conversations conversations={conversations} onConversationClick={handleConversationClick} />
                        <Chat />
                    </>
                )
            }
        </div>
    )
}

export default Home