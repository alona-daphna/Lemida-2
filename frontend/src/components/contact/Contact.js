import { useContext, useEffect, useState } from 'react';
import './contact.css';
import { CgProfile } from 'react-icons/cg';
import { ChosenChatContext } from '../../context/chosenChatContext';
import { SocketContext } from '../../context/socketContext';
import { UserContext } from '../../context/userContext';
import ContextMenu from '../contextMenu/contextMenu'
import { ChatContext } from "../../context/chatListContext";

const Contact = ({ contact, onConversationClicked }) => {

    const {user, setUser} = useContext(UserContext);
    const { chosenChat, setChosenChat } = useContext(ChosenChatContext)
    const {socket} = useContext(SocketContext)
    const {id, name, lastMsg, senderName, time, picture} = contact
    const [showContextMenu, setShowContextMenu] = useState(false);
    const { dispatch: setChatList } = useContext(ChatContext)
    const [contextMenuPos, setContextMenuPos] = useState({left: "0px", top: "0px"});
    
    const handleContactClick = () => {
        onConversationClicked()
        // set to chat object
        setChosenChat(contact)
        
    }

    const handleContextMenu = (e) => {
        e.preventDefault();
        console.log("Right-clicked!");
        setContextMenuPos({
            left: e.pageX + "px",
            top: e.pageY + "px",
        });
        setShowContextMenu(true);
    };

    useEffect(() => {
        // join socket room with chat id
        socket.emit('join-room', id)
    }, [])

    return ( 
        <div className="contact-container">
            <div onClick={handleContactClick} onContextMenu={handleContextMenu}>
                <div className="contact">
                    {picture ? 
                        <img className='profile-picture' src={picture} alt="ProfilePic"/>
                        : <CgProfile className="profile-picture"/>}
                    <div className="info">
                        <div className="name">{name}</div>
                        <div className='last-message-container'>
                            <div className="last-message-sender">{senderName ? (user.username == senderName ? "You" : senderName) + ":" : ""}</div>
                            <div className="last-message">{lastMsg}</div>
                        </div>
                    </div>
                    <div className="time">{time}</div>
                </div>
                <div className="line"></div>
            </div>
            {showContextMenu && (
                <div className="contact-context-menu" style={{left: contextMenuPos.left, top: contextMenuPos.top}}>
                    <ContextMenu
                        onClose={() => setShowContextMenu(false)}
                        onPinClick={() => console.log('Pin clicked!')}
                        onDeleteClick={
                            async () => {
                                const response = await fetch(`http://localhost:4000/api/chats/${id}`, {
                                    method: 'DELETE',
                                    credentials: 'include'
                                })
                                const json = await response.json()

                                if (response.ok) {
                                    if (chosenChat?.id === id) {
                                        setChosenChat(null)
                                    }
                                    setChatList({
                                        type: 'DELETE_CHAT',
                                        payload: {"id": id}
                                    })
                                }
                            }
                        }
                    />
                </div>
            )}
        </div>
     );
}
 
export default Contact;
