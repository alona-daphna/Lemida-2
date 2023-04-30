import Contact from "../contact/Contact";
import './conversations.css'
import { BiSearch } from 'react-icons/bi';
import { useContext, useEffect, useState } from 'react';
import { ChatContext } from "../../context/chatListContext";
import { formatChat } from '../../utils/formatChat';

const Conversations = ({ onConversationClick, setShowChatForm }) => {
    const [searchInput, setSearchInput] = useState('')

    const { chats, dispatch: setChatList } = useContext(ChatContext)

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(searchInput)
    }

    const handleCreateChat = async () => {
        setShowChatForm(true);

    }

    useEffect(() => {
        const fetchConversations = async() => {
            const response = await fetch("http://localhost:4000/api/chats", {
                credentials: 'include'
            })
            const chatsJson = await response.json()
            console.log(chatsJson)
            // const chatsFiltered = chatsJson.map(chat => {return formatChat(chat)});
            // console.log(chatsFiltered)
            setChatList({
                type: 'SET_CHATS',
                payload: chatsJson
                // payload: chatsFiltered
            })
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
                            contact={contact}
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