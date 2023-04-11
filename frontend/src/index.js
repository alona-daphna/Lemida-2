import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UserProvider } from './context/userContext';
import { ChatProvider } from './context/chatListContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <UserProvider>
        <ChatProvider>
            <App />
        </ChatProvider>
    </UserProvider>
);

