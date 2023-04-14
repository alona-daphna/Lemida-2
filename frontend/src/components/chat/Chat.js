import Message from '../message/Message';
import './chat.css'
import { IoSend, IoArrowBack } from 'react-icons/io5';
import { CgMoreVerticalAlt, CgSearch } from 'react-icons/cg';
import { useState, useRef, useEffect, useContext } from 'react';
import { ChosenChatContext } from '../../context/chosenChatContext';
import { UserContext } from '../../context/userContext';
import { SocketContext } from '../../context/socketContext';

const Chat = ({ onBackClick }) => {
    const { chosenChat } = useContext(ChosenChatContext)
    const { user } = useContext(UserContext)
    const { socket } = useContext(SocketContext)

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

                const response = await fetch(`http://localhost:4000/api/chats/${chosenChat}`, {
                    credentials: 'include'
                })
                const chat = await response.json()
                setCurrentChat(chat)
                setMessages(chat.message_history)
            }
        }

        fetchMessages()
    }, [chosenChat])

    useEffect(() => {
        // it sends twice to sender, shouldt go here for sender
        socket.on('new-message', (message) => {
            setMessages((prevMessages) => [...prevMessages, { text: message.text, sender: message.sender }]);
            console.log('new message')
        })

        return () => {
            socket.off('new-message');
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (message) {
            setUserAtBottom(isScrolledToBottom())
            
            socket.emit('send-message', {
                room: chosenChat, 
                message: { text: message, sender: user._id}
            })

            setMessages([...messages, { text: message, sender: user._id }])

            // save message to db
            const response = await fetch(`http://localhost:4000/api/chats/${chosenChat}/messages`, {
                method: 'POST',
                body: JSON.stringify({
                    "text": message
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })

            console.log(await response.json())

            setMessage('')
        }

    }
    return (
        <div className="chat">
            {chosenChat ?
                <>
                    <div className="top-bar">
                        <button className='back' onClick={onBackClick}><IoArrowBack /></button>
                        <img className='profile-picture' src="https://shorturl.at/dfpzV" alt="ProfilePic" />
                        <div className='info'>
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
                        <h3>welcome</h3>
                    </div>
                </>
            }
        </div>
    );
}

export default Chat;