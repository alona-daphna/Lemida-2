import Contact from "../contact/Contact";
import './conversations.css'
import { BiSearch } from 'react-icons/bi';


const Conversations = () => {

    const handleSubmit = async () => {

    }

    const contacts = [
        { name: "Ido Haritan", lastMsg: "Backend is the best 🤡", time: "10:39", picture: "https://shorturl.at/dfpzV"},
        { name: "Alona", lastMsg: "TestMsg", time: "10:38"},
        { name: "Kfir", lastMsg: "TestMsg", time: "10:37"},
        { name: "Ido2", lastMsg: "TestMsg", time: "10:09"},
        { name: "NoBody", lastMsg: "TestMsg", time: "Yesterday"},
        { name: "Donut", lastMsg: "TestMsg", time: "Yesterday"},
        { name: "Test", lastMsg: "TestMsg", time: "Yesterday"},
        { name: "VeryLongLongLongLongLongLongLongLongLongLong  Name Test", lastMsg: "TestMsg", time: "Yesterday"},
        { name: "Sleep", lastMsg: "TestMsg", time: "Yesterday"},
        { name: "Eat", lastMsg: "TestMsg", time: "Yesterday"},
        { name: "Ido Haritan", lastMsg: "TestMsg", time: "Yesterday"},
        { name: "Alona", lastMsg: "TestMsg", time: "Yesterday"},
        { name: "Kfir", lastMsg: "TestMsg", time: "Yesterday"},
        { name: "Ido2", lastMsg: "TestMsg", time: "Yesterday"},
        { name: "NoBody", lastMsg: "TestMsg", time: "Yesterday"},
        { name: "Donut", lastMsg: "TestMsg", time: "Yesterday"},
        { name: "Test", lastMsg: "TestMsg", time: "Yesterday"},
        { name: "VeryLongLongLongNameTest", lastMsg: "TestMsg", time: "Yesterday"},
        { name: "Sleep", lastMsg: "TestMsg", time: "Yesterday"},
        { name: "Eat", lastMsg: "TestMsg", time: "02/04/2023"},
      ];

    return ( 
        <div className="conversations" >
            <form className="search-form" onSubmit={handleSubmit}>
                <input className="search-input" type="text" placeholder='Search'/>
                <button className="search-button"><BiSearch /></button>
            </form>
            <div className="chats">
                {contacts.map((contact, index) => (
                    <Contact key={index} name={contact.name} lastMsg={contact.lastMsg} time={contact.time} picture={contact.picture}/>
                ))}
            </div>
        </div>
     );
}
 
export default Conversations;