import Message from '../message/Message';
import './chat.css'
import { IoSend, IoArrowBack } from 'react-icons/io5';
import { CgMoreVerticalAlt, CgSearch } from 'react-icons/cg';
import { useState, useRef, useEffect } from 'react';

const Chat = ({ onBackClick }) => {

    const [message, setMessage] = useState('')

    const [messages, setMessages] = useState([
        { text: "Hey, how's it going?", sent: true },
        { text: "I'm doing well, thanks for asking!", sent: false },
        { text: "What have you been up to lately?", sent: true },
        { text: "Not much, just hanging out with friends.", sent: false },
        { text: "ChatGPT is the best!", sent: true },
        { text: "Very helpful with FullStack development :)", sent: false },
        { text: "Hi MERN webapp", sent: true },
        { text: "CSS is shit", sent: true },
        { text: "Also frontend", sent: true },
        { text: "Backend is the best 🤡", sent: false },
    ])

    const messagesEndRef = useRef(null)
    const formRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (message) {
            setMessages([...messages, {text: message, sent: true}])
        }
        formRef.current.reset()
    }
    return ( 
        <div className="chat">
            <div className="top-bar">
                <button className='back' onClick={onBackClick}><IoArrowBack /></button>
                <img className='profile-picture' src="https://shorturl.at/dfpzV" alt="ProfilePic"/>
                <div className='info'>
                    <p className='chat-name'>MERN Lemida Project 🤓</p>
                    <p className='chat-info'>Tap here for group info</p>
                </div>
                <CgSearch className='search-chat-button' />
                <CgMoreVerticalAlt className='more-button' />
            </div>
            
            <div className="chat-body">
                {messages.map((message, index) => (
                    <Message 
                        key={index} 
                        message={message.text} 
                        isMine={message.sent} 
                    />
                ))}
                <div ref={messagesEndRef} /> 
            </div>

            <form className="bottom-bar" onSubmit={handleSubmit} ref={formRef}>
                <input className='message' type="text" placeholder='Type a message' onChange={(e) => setMessage(e.target.value)}/>
                <button className="send"><IoSend /></button>
            </form>
        </div>
    );
}
 
export default Chat;