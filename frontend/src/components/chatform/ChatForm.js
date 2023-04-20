import './chatform.css';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { formatChat } from '../../utils/formatChat';
import { ChatContext } from '../../context/chatListContext';
import { IoArrowBack } from 'react-icons/io5';
import { MdDeleteForever } from 'react-icons/md';

const ChatForm = ({ setShowChatForm }) => {
    const { dispatch: setChatList } = useContext(ChatContext)

    const [name, setName] = useState('')
    const [members, setMembers] = useState([])
    const [memberToAdd, setMemberToAdd] = useState('')
    const [error, setError] = useState('')
    const participantsRef = useRef(null);

    useEffect(() => {
        if (participantsRef.current) {
            participantsRef.current.scrollTop = participantsRef.current.scrollHeight;
        }
    }, [members])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch('http://localhost:4000/api/chats', {
            method: 'POST',
            body: JSON.stringify({
                "name": name,
                "members": members
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })

        let json = await response.json()
        console.log(json)
        if (response.ok) {
            json = formatChat(json)
            setChatList({
                type: 'ADD_CHAT',
                payload: json
            })
            // navigate to home
            setShowChatForm(false)
        } else {
            setError(json.error)
        }
    }

    const handleAddParticipant = (e) => {
        e.preventDefault()
        if (memberToAdd) {
            setMembers((prevMembers) => [...prevMembers, memberToAdd])
            setMemberToAdd('')
        }
    }

    return (
        <div className="outer-container">
            <div className='inner-container'>
                <button className="back-button" onClick={() => setShowChatForm(false)}><IoArrowBack /></button>
                <h2 className="create-chat middle">Create A New Chat</h2>
                <form className='new-chat-form' onSubmit={handleSubmit}>
                    <input type="text" placeholder='Enter chat name' onChange={(e) => setName(e.target.value)} />

                    <div className="add-participants">
                        <label>Add participants</label>
                        <div className="input-and-button">
                            <input type="text" placeholder='Enter a username' value={memberToAdd} onChange={(e) => setMemberToAdd(e.target.value)} />
                            <button className="add-participant" onClick={handleAddParticipant}>Add</button>
                        </div>
                    </div>

                    {members.length > 0 && <div className="show-participants" ref={participantsRef}>
                        {members.map((member, index) => (
                            <div key={index} className="participant">
                                <p className="name" key={index}>{member}</p>
                                <div className='x' onClick={() => setMembers((prevMembers) => prevMembers.filter((_, i) => i !== index))}><MdDeleteForever className='delete-icon'/></div>
                            </div>
                        ))}
                    </div>}

                    <button className="submit">Create new chat</button>
                </form>
                {error && <div className='error middle'>{error}</div>}
            </div>
        </div>
    )
}

export default ChatForm