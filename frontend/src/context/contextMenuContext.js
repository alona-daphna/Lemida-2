import { createContext, useState } from 'react';

export const ContextMenuContext = createContext();

export const ContextMenuProvider = ({ children }) => {
    const [contextMenu, setContextMenu] = useState(null);

    return (
        <ContextMenuContext.Provider value={{ contextMenu, setContextMenu }}>
            {children}
        </ContextMenuContext.Provider>
    )
}

