import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UserProvider } from './context/userContext';
import { ChatProvider } from './context/chatListContext';
import { ChosenChatProvider } from './context/chosenChatContext';
import { SocketProvider } from './context/socketContext';
import { ContextMenuProvider } from './context/contextMenuContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <UserProvider>
        <ChatProvider>
            <ChosenChatProvider>
                <SocketProvider>
                    <ContextMenuProvider>
                        <App />
                    </ContextMenuProvider>
                </SocketProvider>
            </ChosenChatProvider>
        </ChatProvider>
    </UserProvider>
);

