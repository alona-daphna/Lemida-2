import Contact from "../contact/Contact";
import './conversations.css'
import { BiSearch } from 'react-icons/bi';
import { useContext, useEffect, useState } from 'react';
import { ChatContext } from "../../context/chatListContext";
import { formatChat } from '../../utils/formatChat';
import { SocketContext } from "../../context/socketContext";
import { UserContext } from "../../context/userContext";

const Conversations = ({ onConversationClick, setShowChatForm }) => {
    const [searchInput, setSearchInput] = useState('')

    const { chats, dispatch: setChatList } = useContext(ChatContext)
    const { socket } = useContext(SocketContext)
    const { user } = useContext(UserContext)

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(searchInput)
    }

    const handleCreateChat = async () => {
        setShowChatForm(true);

    }

    useEffect(() => {
        if (socket) {

            socket.on('join-existing-chat', (data) => {
                const { chat, members, who } = data
                if (members.includes(user.username)) {
                    setChatList({
                        type: 'ADD_CHAT',
                        payload: chat
                    })
                    console.log(`${who} added you and ${members.filter(m => m !== user.username)}`)
                } else {
                    console.log(`${who === user.username ? 'You' : who} added ${members}`)
                }
            })

            socket.on('join-new-chat', (chat) => {
                setChatList({
                    type: 'ADD_CHAT',
                    payload: chat
                })
            })

            socket.on('other-member-exit', (data) => {
                const { room, member } = data;
                setChatList({
                    type: 'REMOVE_MEMBER',
                    payload: {chatId: room, memberToRemove: member}
                })
            })
        }

        const fetchConversations = async () => {
            const response = await fetch("http://localhost:4000/api/chats", {
                credentials: 'include'
            })
            const chatsJson = await response.json()
            const chatsFiltered = chatsJson.map(chat => { return formatChat(chat) });
            setChatList({
                type: 'SET_CHATS',
                payload: chatsFiltered
            })
        }

        fetchConversations();
        return () => {
            if (socket) {
                socket.off('join-existing-chat')
                socket.off('join-new-chat')
                socket.off('other-member-exit')
            }
        }
    }, [socket])

    return (
        <div className="conversations" >
            <form className="search-form" onSubmit={handleSubmit}>
                <input className="search-input" type="text" placeholder='Search' onChange={(e) => setSearchInput(e.target.value)} />
                <button className="search-button"><BiSearch /></button>
            </form>
            <div className="chats">
                {chats &&
                    chats.filter(function (el) { return el.name.toLowerCase().includes(searchInput.toLowerCase()) }).map((contact, index) => (
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