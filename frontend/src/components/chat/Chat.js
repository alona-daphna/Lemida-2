import Message from '../message/Message';
import './chat.css'
import { IoSend, IoArrowBack } from 'react-icons/io5';
import { CgMoreVerticalAlt, CgSearch } from 'react-icons/cg';
import { FiUnlock } from 'react-icons/fi';
import { useState, useRef, useEffect, useContext } from 'react';
import { ChosenChatContext } from '../../context/chosenChatContext';
import { UserContext } from '../../context/userContext';
import { SocketContext } from '../../context/socketContext';
import { ChatContext } from "../../context/chatListContext";

const Chat = ({ onBackClick, setShowChatInfo }) => {
    const { chosenChat } = useContext(ChosenChatContext)
    const { user } = useContext(UserContext)
    const { socket } = useContext(SocketContext)
    const {chats: chats, dispatch: setChatList} = useContext(ChatContext)

    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState(null)
    const [userAtBottom, setUserAtBottom] = useState(true)
    const [currentChat, setCurrentChat] = useState(null)

    const messagesEndRef = useRef(null)
    const chatBodyRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    const isScrolledToBottom = () => {
        const scrollTop = chatBodyRef.current.scrollTop
        const scrollHeight = chatBodyRef.current.scrollHeight
        const clientHeight = chatBodyRef.current.clientHeight

        // thershold is set to about one message
        return Math.abs(scrollHeight - clientHeight - scrollTop) < 50
    }

    useEffect(() => {
        if (userAtBottom) {
            scrollToBottom()
        }
    }, [messages, userAtBottom])

    useEffect(() => {
        // fetch chat message history
        const fetchMessages = async () => {
            if (chosenChat) {
                const response = await fetch(`http://localhost:4000/api/chats/${chosenChat.id}`, {
                    credentials: 'include'
                })
                const chat = await response.json()
                setCurrentChat(chat)

                const idToUsername = {};
                chat.members.forEach(member => {
                    idToUsername[member._id] = member.username;
                });

                const messagesWithUsername = chat.message_history.map(message => {
                    const { sender, text, createdAt } = message;
                    const username = idToUsername[sender];
                    return { text, sender, username, createdAt };
                });

                setMessages(messagesWithUsername)
            }
        }

        fetchMessages()
    }, [chosenChat])

    useEffect(() => {
        socket.on('new-message', (data) => {
            const { message, room } = data

            if (chosenChat && room === chosenChat.id) {
                setMessages((prevMessages) => [...prevMessages, { text: message.text, sender: message.sender, username: message.username, createdAt: message.createdAt }]);
            }
            // add chat to top of chatlist
            setChatList({
                type: 'PUSH_TO_TOP',
                payload: { id: room, message: message, senderName: message.username }
            })

        })

        return () => {
            socket.off('new-message');
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (message) {
            setUserAtBottom(isScrolledToBottom())
            // save message to db
            const response = await fetch(`http://localhost:4000/api/chats/${chosenChat.id}/messages`, {
                method: 'POST',
                body: JSON.stringify({
                    "text": message
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })

            const updatedChat = await response.json();
            const newMsg = updatedChat.message_history.slice(-1)[0];
            const msgToAdd = { text: newMsg.text, sender: newMsg.sender, username: user.username, createdAt: newMsg.createdAt }
            setMessages([...messages, msgToAdd])

            socket.emit('send-message', {
                room: chosenChat.id, 
                message: msgToAdd
            })

            setMessage('')

            setChatList({
                type: 'PUSH_TO_TOP',
                payload: { id: chosenChat.id, message: msgToAdd, senderName: user.username }
            })
        }
    }

    return (
        <div className="chat">
            {chosenChat ?
                <>
                    <div className="top-bar">
                        <button className='back' onClick={onBackClick}><IoArrowBack /></button>
                        <img className='profile-picture' src="https://shorturl.at/dfpzV" alt="ProfilePic" onClick={() => setShowChatInfo(true)}/>
                        <div className='info' onClick={() => setShowChatInfo(true)}>
                        {currentChat && 
                        <div>
                            <p className='chat-name'>{currentChat.name}</p>
                            <p className='chat-info'>Tap here for group info</p>
                        </div>
                        }
                        </div>
                        <CgSearch className='search-chat-button' />
                        <CgMoreVerticalAlt className='more-button' />
                    </div>

                    <div className="chat-body" ref={chatBodyRef}>
                        {messages && messages.map((message, index) => (
                            <Message
                                key={index}
                                message={message.text}
                                isMine={message.sender === user._id}
                                time={message.createdAt}
                                username={message.username}
                            />
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <form className="bottom-bar" onSubmit={handleSubmit}>
                        <input className='message' type="text" placeholder='Type a message' value={message} onChange={(e) => setMessage(e.target.value)} />
                        <button className="send"><IoSend /></button>
                    </form>
                </>
                :
                <>
                    <div className="no-chosen-chat">
                        <div className="welcome">Welcome</div>
                        <div className="welcome-info">Send and receive messages in real time.</div>
                        <div className="welcome-div">
                            <FiUnlock className="unlock"/>
                            <div className="decrypted">End-to-end decrypted 😉</div>
                        </div>
                    </div>
                </>
            }
        </div>
    );
}

export default Chat;