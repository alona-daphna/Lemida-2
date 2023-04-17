import React, { createContext, useReducer } from 'react';

// functionality to edit the chat list state
const chatReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CHATS':
            return {
                // arrange chat array by chat's latest createdAt/lastMsgDate in descending order
                chats: action.payload.sort((a, b) => {
                    const aLatestDate = a.lastMsgDate ? Math.max(new Date(a.createdAt), new Date(a.lastMsgDate)) : a.createdAt
                    const bLatestDate = b.lastMsgDate ? Math.max(new Date(b.createdAt), new Date(b.lastMsgDate)) : b.createdAt
                    // convert numeric values returned from Math.max to Date object, then do the comparison
                    return new Date(bLatestDate) - new Date(aLatestDate) 
                  })
            }
        case 'ADD_CHAT':
            return {
                // add newly created chat to top
                chats: [action.payload, ...state.chats]
            }
        case 'UPDATE_CHAT':
            return {
                chats: state.chats.map(chat => 
                    chat.id === action.payload.id ? action.payload : chat
                )
            }
        case 'DELETE_CHAT':
            return {
                chats: state.chats.filter(chat => chat.id !== action.payload.id )
            }
        case 'PUSH_TO_TOP':
            // receives a chat id
            const {id, message, senderName}  = action.payload
            let chatToPush = state.chats.find(chat => chat.id === id);
            
            // edit chat's lastMsg and time
            const date = new Date(message.createdAt)
            const hour = date ? date.getHours().toString().padStart(2, "0") : "";
            const minute = date ? date.getMinutes().toString().padStart(2, "0") : "";        
            chatToPush.time = `${hour}:${minute}`
            chatToPush.lastMsg = message.text
            chatToPush.senderName = senderName
            
            const remainingChats = state.chats.filter(chat => chat.id !== id )
            return {
                chats: [chatToPush, ...remainingChats]
            }
        default:
            return state
    }
}

export const ChatContext = createContext()

export const ChatProvider = ({ children }) => {
    const [state, dispatch] = useReducer(chatReducer, {
        // initial chat list state
        chats: []
    })

    return (
        <ChatContext.Provider value={{...state, dispatch}}>
            {children}
        </ChatContext.Provider>
    )
}