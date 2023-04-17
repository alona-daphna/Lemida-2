import React, { useContext, useState } from 'react'
import { formatChat } from '../../utils/formatChat';
import { ChatContext } from '../../context/chatListContext';

const ChatForm = ({ setShowChatForm }) => {
    const { dispatch: setChatList } = useContext(ChatContext)

    const [name, setName] = useState('')
    const [members, setMembers] = useState([])
    const [memberToAdd, setMemberToAdd] = useState('')
    const [error, setError] = useState('')

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
        } else {
            setError(json.error)
        }
    }

    const handleAddParticipant = (e) => {
        e.preventDefault()
        setMembers((prevMembers) => [...prevMembers, memberToAdd])
    }

  return (
    <div className="chat-form-container">
        <button className="back-button" onClick={() => setShowChatForm(false)}>back</button>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder='chat name' onChange={(e) => setName(e.target.value)}/>
            <div className="add-participants">
                <label>Add participants</label>
                <input type="text" placeholder='Enter a username' onChange={(e) => setMemberToAdd(e.target.value)}/>
                <button className="add-participant" onClick={handleAddParticipant}>Add</button>
            </div>
            {members && <div className="show-participants">
                {members.map((member, index) => (
                    <div key={index}>{member}</div>
                ))}
            </div>}
            <button className="submit">Create new chat</button>
        </form>
        {error && <div className='error'>{error}</div>}
    </div>
  )
}

export default ChatForm