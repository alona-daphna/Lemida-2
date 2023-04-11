import Contact from "../contact/Contact";
import './conversations.css'
import { BiSearch } from 'react-icons/bi';
import { useState } from 'react';

const Conversations = ({ conversations, onConversationClick }) => {

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(searchInput)
    }

    const [searchInput, setSearchInput] = useState('')

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