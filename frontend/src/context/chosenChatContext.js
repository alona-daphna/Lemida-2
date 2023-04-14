import { createContext, useState } from 'react';

export const ChosenChatContext = createContext();

export const ChosenChatProvider = ({ children }) => {
    const [chosenChat, setChosenChat] = useState(null);

    return (
        <ChosenChatContext.Provider value={{ chosenChat, setChosenChat}}>
            {children}
        </ChosenChatContext.Provider>
    )
}

