import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UserProvider } from './context/userContext';
import { ChatProvider } from './context/chatListContext';
import { ChosenChatProvider } from './context/chosenChatContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <UserProvider>
        <ChatProvider>
            <ChosenChatProvider>
                <App />
            </ChosenChatProvider>
        </ChatProvider>
    </UserProvider>
);

