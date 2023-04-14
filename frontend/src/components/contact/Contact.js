import { useContext } from 'react';
import './contact.css';
import { CgProfile } from 'react-icons/cg';
import { ChosenChatContext } from '../../context/chosenChatContext';

const Contact = ({ id, name, lastMsg, time, picture, onConversationClicked }) => {

    // only prop should be chat object itself
    // move logic of formatting chat to here
    const {setChosenChat} = useContext(ChosenChatContext)
    
    const handleContactClick = () => {
        console.log(id)
        onConversationClicked()
        setChosenChat(id)
    }

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