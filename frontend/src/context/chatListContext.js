import React, { createContext, useReducer } from 'react';

// functionality to edit the chat list state
const chatReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CHATS':
            return {
                chats: action.payload
            }
        case 'ADD_CHAT':
            return {
                chats: [...state.chats, action.payload]
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
            const id  = action.payload
            const chatToPush = state.chats.find(chat => chat.id === id);
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