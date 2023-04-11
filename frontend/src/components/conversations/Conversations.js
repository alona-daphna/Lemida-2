import Contact from "../contact/Contact";
import './conversations.css'
import { BiSearch } from 'react-icons/bi';
import { useContext, useEffect, useState } from 'react';
import { ChatContext } from "../../context/chatListContext";

const Conversations = ({ onConversationClick }) => {
    const [searchInput, setSearchInput] = useState('')
    const [conversations, setConversations] = useState([])

    const { chats, dispatch: setChatList } = useContext(ChatContext)

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(searchInput)
    }

    const handleCreateChat = async () => {

        const response = await fetch('http://localhost:4000/api/chats', {
            method: 'POST',
            body: JSON.stringify({
                "name": "Mern Project 🤓",
                "members": ["643157a9d77115c4ca3d9a2c",
                            "6431e2509737417f01a760ec"]
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })

        const json = await response.json()
        console.log(json)

        setChatList({
            type: 'ADD_CHAT',
            payload: json
        })

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

            setChatList({
                type: 'SET_CHATS',
                payload: chatsFiltered
            })
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
                {chats && 
                    chats.filter(function (el) {return el.name.toLowerCase().includes(searchInput.toLowerCase())}).map((contact, index) => (
                        <Contact 
                            key={index} 
                            name={contact.name} 
                            lastMsg={contact.lastMsg} 
                            time={contact.time} 
                            picture={contact.picture} 
                            onConversationClicked={onConversationClick}
                        />
                    ))
                }
            </div>
            <div className="create-chat">
                <button onClick={handleCreateChat}>
                    New
                </button>
            </div>
        </div>
     );
}
 
export default Conversations;