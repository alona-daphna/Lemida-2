import './chatinfo.css'
import { IoArrowBack } from 'react-icons/io5';
import { MdDeleteForever, MdDone } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import React, { useContext, useEffect, useState, useRef } from 'react'
import { ChosenChatContext } from '../../context/chosenChatContext';
import { UserContext } from '../../context/userContext';
import { SocketContext } from '../../context/socketContext';

const ChatInfo = ({ setShowChatInfo }) => {
  const { chosenChat, setChosenChat } = useContext(ChosenChatContext)
  const { user } = useContext(UserContext)
  const { socket } = useContext(SocketContext)
  const [addParticipant, setAddParticipant] = useState(false)
  const [memberToAdd, setMemberToAdd] = useState('')
  const [members, setMembers] = useState([])
  const [name, setName] = useState(chosenChat.name)
  const [error, setError] = useState('')
  const participantsRef = useRef(null);
  const containerBottomRef = useRef(null)
  const membersRef = useRef(null)

  useEffect(() => {
    socket.on('other-member-exit', (data) => {
      const { member } = data
      setChosenChat({ ...chosenChat, members: chosenChat.members.filter(m => m != member.username) })
    })

    socket.on('other-member-join', (data) => {
      const { members } = data
      setChosenChat({ ...chosenChat, members: [...chosenChat.members, ...members] })
    })

    return () => {
      socket.off('other-member-exit')
      socket.off('other-member-join')
    }
  }, [])

  useEffect(() => {
    if (participantsRef.current) {
      participantsRef.current.scrollTop = participantsRef.current.scrollHeight;
    }
    if (containerBottomRef.current) {
      containerBottomRef.current.scrollTop = containerBottomRef.current.scrollHeight;
    }
  }, [members])

  useEffect(() => {
    if (membersRef.current) {
      membersRef.current.scrollTop = membersRef.current.scrollHeight;
    }
  }, [chosenChat.members])

  const handleChangeName = async (e) => {
    e.preventDefault()
    if (name !== chosenChat.name) {
      const response = await fetch(`http://localhost:4000/api/chats/${chosenChat.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          "name": name,
          "members": chosenChat.members
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })

      if (response.ok) {
        toast("Name updated successfully", {
          progressClassName: 'custom-toast-progress-bar'
        })
        setChosenChat({ ...chosenChat, name: name })
      }

    }
  }

  const handleExitChat = async () => {
    const response = await fetch(`http://localhost:4000/api/chats/${chosenChat.id}`, {
      method: 'DELETE',
      credentials: 'include'
    })
    const json = await response.json()

    if (response.ok) {
      socket.emit('member-exit', {
        room: chosenChat.id,
        member: user
      })

      setChosenChat(null)
      // navigate back to home
      setShowChatInfo(false)

    } else {
      setError(json.error)
    }
  }

  const handleAddParticipants = async () => {
    // check if members are not already members of the chat
    const newMembers = members.filter(m => !chosenChat.members.includes(m))
    if (newMembers.length) {
      const response = await fetch(`http://localhost:4000/api/chats/${chosenChat.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          "name": name ? name : chosenChat.name,
          "members": [...chosenChat.members, ...newMembers]
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
      const json = await response.json()
      if (response.ok) {
        const updatedChosenChat = { ...chosenChat, members: [...chosenChat.members, ...newMembers] };
        toast("Participants added successfully", {
          progressClassName: 'custom-toast-progress-bar'
        })
        // current user is adding new members to the room, how do i do that with sockets?
        socket.emit('other-join-room', {
          chat: chosenChat,
          members: newMembers,
          who: user.username
        })
        socket.emit('member-join', {
          chat: chosenChat,
          members: newMembers
        })
        setChosenChat(updatedChosenChat)
        setMembers([])
        setAddParticipant(false)
        setError('')
      } else {
        setError(json.error)
      }
    } else {
      setMembers([])
      setAddParticipant(false)
    }

  }

  const handleAddParticipant = (e) => {
    e.preventDefault()
    if (memberToAdd) {
      setMembers((prevMembers) => [...prevMembers, memberToAdd])
      setMemberToAdd('')
      setError('')
    }
  }

  return (
    <div className="outer-container">
      <div className="inner-container" ref={containerBottomRef}>
        <button className="back-button" onClick={() => setShowChatInfo(false)}><IoArrowBack /></button>
        <h2 className='middle'>Chat Info</h2>
        <div className="chat-info-content">
          <form className="chat-name-form" onSubmit={handleChangeName}>
            <input autoFocus className='chat-name' value={name} onChange={(e) => setName(e.target.value)} />
            <button onClick={handleChangeName}>change</button>
          </form>
          <p className="members-label">{chosenChat.members.length} participants</p>
          <div className="members" ref={membersRef}>
            {chosenChat && chosenChat.members.map((member, index) => (
              <div className={member == user.username ? 'you member' : 'member'} key={index}>{member == user.username ? 'You' : member}</div>
            ))}
          </div>
          {addParticipant
            ? <div className='add-participants-div'>
              <form onSubmit={handleAddParticipant} className="add-participants-form">
                <div className="input-and-button">
                  <input type="text" placeholder='Enter a username' value={memberToAdd} onChange={(e) => setMemberToAdd(e.target.value)} />
                  <button className="add-participant" onClick={handleAddParticipant}>Add</button>
                </div>
              </form>

              {members && members.length > 0 && <div className="show-participants" ref={participantsRef}>
                {members.map((member, index) => (
                  <div key={index} className="participant">
                    <p className="name" key={index}>{member}</p>
                    <div className='x' onClick={() => {
                      setMembers((prevMembers) => prevMembers.filter((_, i) => i !== index))
                      if (!members) setAddParticipant(false)
                      setError('')
                    }}><MdDeleteForever className='delete-icon' /></div>
                  </div>
                ))}
              </div>}
              {members.length > 0 &&
                <div className="middle">
                  <button className="add-members-button" onClick={handleAddParticipants}><MdDone /></button>
                </div>
              }
              {error && <div className='error'>{error}</div>}
            </div>


            : <button className="add-member" onClick={() => setAddParticipant(true)}>Add participant</button>}
          <button className="exit-chat" onClick={handleExitChat}>Exit chat</button>
        </div>
      </div>
      <ToastContainer className="toast-container" />

    </div>
  )
}

export default ChatInfo