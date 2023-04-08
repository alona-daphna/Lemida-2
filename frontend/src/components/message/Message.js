import './message.css'

const Message = ({ message, isMine }) => {
    return (
        <div className={isMine ? 'message-bubble mine' : 'message-bubble'}>
            <p>{message}</p>
        </div>
    );
}
 
export default Message;