import './message.css'

const Message = ({ message, isMine, time, username }) => {
    const date = new Date(time);
    const hour = date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");
    return (
        <div className={"message-bubble " + (isMine ? "sent-message" : "received-message")}>
            <p className="sender-name">{isMine ? "You" : username}</p>
            <p className="message-text">{message}</p>
            <div className="msg-info">
                <p className="message-time">{`${hour}:${minute}`}</p>
                <p className="checkmarks"></p>
            </div>
        </div>
    );
}
 
export default Message;