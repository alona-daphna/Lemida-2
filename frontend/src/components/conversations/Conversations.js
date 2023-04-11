import Contact from "../contact/Contact";
import './conversations.css'
import { BiSearch } from 'react-icons/bi';
import { useEffect, useState } from 'react';

const Conversations = ({ onConversationClick }) => {
    const [searchInput, setSearchInput] = useState('')
    const [conversations, setConversations] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(searchInput)
    }

    useEffect(() => {
        const fetchConversations = async() => {
            const response = await fetch("http://localhost:4000/api/chats", {
                credentials: 'include'
            })
            const chatsJson = await response.json()

            const chatsFiltered = chatsJson.map(chat => {
                const lastMessage = chat.message_history.slice(-1)[0];
                const date = lastMessage ? new Date(lastMessage.createdAt) : "";
                const hour = date ? date.getHours().toString().padStart(2, "0") : "";
                const minute = date ? date.getMinutes().toString().padStart(2, "0") : "";
                return {
                    "name": chat.name,
                    "lastMsg": lastMessage ? lastMessage.text : "",
                    "time": date ? `${hour}:${minute}` : "",
                    // To change to real images
                    "picture": chat.name==="Ido" ? "https://shorturl.at/dfpzV" : ""
                };
            });

            setConversations(chatsFiltered)
        }

        fetchConversations();
    }, [])

    return ( 
        <div className="conversations" >
            <form className="search-form" onSubmit={handleSubmit}>
                <input className="search-input" type="text" placeholder='Search' onChange={(e) => setSearchInput(e.target.value)}/>
                <button className="search-button"><BiSearch /></button>
            </form>
            <div className="chats">
                {conversations.filter(function (el) {return el.name.toLowerCase().includes(searchInput.toLowerCase())}).map((contact, index) => (
                    <Contact 
                        key={index} 
                        name={contact.name} 
                        lastMsg={contact.lastMsg} 
                        time={contact.time} 
                        picture={contact.picture} 
                        onConversationClicked={onConversationClick}
                    />
                ))}
            </div>
        </div>
     );
}
 
export default Conversations;