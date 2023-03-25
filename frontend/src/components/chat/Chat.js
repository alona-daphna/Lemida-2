import Message from '../message/Message';
import './chat.css'
import { IoSend } from 'react-icons/io5';

const Chat = () => {

    const handleSubmit = async (e) => {
        // e.preventDefault();
    }

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

            <form className="bottom-bar" onSubmit={handleSubmit}>
                <input className='message' type="text" placeholder='Type a message'/>
                <button className="send"><IoSend /></button>
            </form>
        </div>
     );
}
 
export default Chat;