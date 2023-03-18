import Contact from "../contact/Contact";
import './conversations.css'


const Conversations = () => {
    return ( 
        <div className="conversations" >
            <input className="search-conv" type="text" placeholder='Search'/>
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