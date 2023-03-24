import Contact from "../contact/Contact";
import './conversations.css'
import { BiSearch } from 'react-icons/bi';


const Conversations = () => {

    const handleSubmit = async () => {

    }

    return ( 
        <div className="conversations" >
            <form className="search-form" onSubmit={handleSubmit}>
                <input className="search-input" type="text" placeholder='Search'/>
                <button className="search-button"><BiSearch /></button>
            </form>
            <Contact />
            <Contact />
            <Contact />
            <Contact />
            <Contact />
            <Contact />
            <Contact />
        </div>
     );
}
 
export default Conversations;