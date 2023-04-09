import './contact.css';
import { CgProfile } from 'react-icons/cg';

const Contact = ({ name, lastMsg, time, picture }) => {
    return ( 
        <div>
            <div class="contact">
                {picture ? <img className='profile-picture' src={picture} alt="ProfilePic"/> : <CgProfile className="profile-picture"/>}
                <div class="info">
                    <div class="name">{name}</div>
                    <div class="last-message">{lastMsg}</div>
                </div>
                <div class="time">{time}</div>
            </div>
            <div class="line"></div>
        </div>
     );
}
 
export default Contact;