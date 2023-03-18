import Message from '../message/Message';
import './chat.css'
import { IoSend } from 'react-icons/io5';

const Chat = () => {
    return ( 
        <div className="chat">
            <div className="top-bar">
                <button className='back'>back</button>
                TopBar
            </div>
            
            <div className="chat-body">
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
            </div>

            <div className="bottom-bar">
                <input className='message' type="text" placeholder='Type a message'/>
                <button className="send"><IoSend /></button>
            </div>
        </div>
     );
}
 
export default Chat;