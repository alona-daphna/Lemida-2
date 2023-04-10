import './contact.css';
import { CgProfile } from 'react-icons/cg';

const Contact = ({ name, lastMsg, time, picture, onConversationClicked }) => {
    return ( 
        <div onClick={onConversationClicked}>
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