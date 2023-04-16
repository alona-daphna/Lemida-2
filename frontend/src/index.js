import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UserProvider } from './context/userContext';
import { ChatProvider } from './context/chatListContext';
import { ChosenChatProvider } from './context/chosenChatContext';
import { SocketProvider } from './context/socketContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <UserProvider>
        <ChatProvider>
            <ChosenChatProvider>
                <SocketProvider>
                    <App />
                </SocketProvider>
            </ChosenChatProvider>
        </ChatProvider>
    </UserProvider>
);

