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
                chats: state.chats.filter(chat => chat !== action.payload.id )
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