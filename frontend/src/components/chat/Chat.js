import Message from '../message/Message';
import './chat.css'
import { IoSend } from 'react-icons/io5';
import { useState } from 'react';

const Chat = () => {

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (message) {
            setMessages([...messages, {text: message, sent: true}])
        }
    }
    return ( 
        <div className="chat">
            <div className="top-bar">
                <button className='back'>back</button>
                topbar
            </div>
            
            <div className="chat-body">
                {messages.map((message, index) => (
                    <Message key={index} message={message.text} isMine={message.sent} />
                ))}
            </div>

            <form className="bottom-bar" onSubmit={handleSubmit}>
                <input className='message' type="text" placeholder='Type a message' onChange={(e) => setMessage(e.target.value)}/>
                <button className="send"><IoSend /></button>
            </form>
        </div>
    );
}
 
export default Chat;