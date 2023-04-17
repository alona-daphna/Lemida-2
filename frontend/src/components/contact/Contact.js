import { useContext, useEffect, useState } from 'react';
import './contact.css';
import { CgProfile } from 'react-icons/cg';
import { ChosenChatContext } from '../../context/chosenChatContext';
import { SocketContext } from '../../context/socketContext';

const Contact = ({ id, name, lastMsg, time, picture, onConversationClicked }) => {

    const {setChosenChat} = useContext(ChosenChatContext)
    const {socket} = useContext(SocketContext)
    
    const handleContactClick = () => {
        onConversationClicked()
        setChosenChat(id)
        
    }

    useEffect(() => {
        // join socket room with chat id
        socket.emit('join-room', id)
    }, [])

    return ( 
        <div onClick={handleContactClick}>
            <div className="contact">
                {picture ? 
                    <img className='profile-picture' src={picture} alt="ProfilePic"/>
                    : <CgProfile className="profile-picture"/>}
                <div className="info">
                    <div className="name">{name}</div>
                    <div className="last-message">{lastMsg}</div>
                </div>
                <div className="time">{time}</div>
            </div>
            <div className="line"></div>
        </div>
     );
}
 
export default Contact;