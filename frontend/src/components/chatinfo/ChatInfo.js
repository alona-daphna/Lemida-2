import './chatinfo.css'
import { IoArrowBack } from 'react-icons/io5';
import { MdDeleteForever, MdDone } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import React, { useContext, useEffect, useState, useRef } from 'react'
import { ChosenChatContext } from '../../context/chosenChatContext';
import { UserContext } from '../../context/userContext';
import { ChatContext } from '../../context/chatListContext';
import { formatChat } from '../../utils/formatChat';

const ChatInfo = ({ setShowChatInfo }) => {
  const { chosenChat, setChosenChat } = useContext(ChosenChatContext)
  const { user } = useContext(UserContext)
  const [memberToAdd, setMemberToAdd] = useState('')
  const [members, setMembers] = useState([])
  const [name, setName] = useState(chosenChat.name)
  const [error, setError] = useState('')
  const [nameError, setNameError] = useState('')
  const participantsRef = useRef(null);
  const containerBottomRef = useRef(null)
  const membersRef = useRef(null)

  // TODO: use sockets to exit chat real time

  const [addParticipant, setAddParticipant] = useState(false)

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
      const response = await fetch(`http://localhost:4000/api/chats/${chosenChat._id}`, {
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

      const json = await response.json()
      console.log(json)
      if (response.ok) {
        toast("Name updated successfully", {
          progressClassName: 'custom-toast-progress-bar'
        })
        setChosenChat({...chosenChat, name: name})
      } else {
        setNameError(json.error)
      }

    } 
  } 

  const handleExitChat = async () => {
    const response = await fetch(`http://localhost:4000/api/chats/${chosenChat._id}`, {
      method: 'DELETE',
      credentials: 'include'
    })
    const json = await response.json()
    console.log(json)

    if (response.ok) {
      setChosenChat(null)
      // navigate back to home
      setShowChatInfo(false)

    } else {
      setError(json.error)
    }
  }

    const handleAddParticipants = async () => {
        // check if members are not already members of the chat
        const dict = chosenChat.members.reduce((acc, cur) => {
            acc[cur.memberId.username] = cur.pinned;
            return acc;
        }, {});
        console.log(dict)
          
        const newMembers = members.filter((username) => !chosenChat.members.some((obj) => obj.memberId.username === username))
        if (newMembers.length) {
            const response = await fetch(`http://localhost:4000/api/chats/${chosenChat._id}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    "name": name ? name : chosenChat.name,
                    "members": [...Object.keys(dict), ...newMembers],
                    "usernameToPinned": dict
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
            const json = await response.json()
            if (response.ok) {
                console.log(json)
                const updatedChosenChat = { ...chosenChat, members: json.members };
                toast("Participants added successfully", {
                    progressClassName: 'custom-toast-progress-bar'
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

  useEffect(() => {
    console.log(chosenChat.members)
  })

  return (
    <div className="outer-container">
      <div className="inner-container" ref={containerBottomRef}>
        <button className="back-button" onClick={() => setShowChatInfo(false)}><IoArrowBack /></button>
        <h2 className='middle'>Chat Info</h2>
        <div className="chat-info-content">
          <form className="chat-name-form" onSubmit={handleChangeName}>
            <input autoFocus className='chat-name' value={name} onChange={(e) => setName(e.target.value)}/>
            <button onClick={handleChangeName}>change</button>
          </form>
          <p className="members-label">{chosenChat.members.length} participants</p>
          <div className="members" ref={membersRef}>
            {chosenChat && chosenChat.members.map((member, index) => (
              <div className={member.memberId.username == user.username ? 'you member' : 'member'} key={index}>{member.memberId.username == user.username ? 'You' : member.memberId.username}</div>
            // <div key={index}>HELLO</div>
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
      <ToastContainer className="toast-container"/>

    </div>
  )
}

export default ChatInfo