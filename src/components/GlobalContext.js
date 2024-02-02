// GlobalContext.js
import React, { createContext, useState } from 'react';
import { addEventListenerSafe } from '../tools/safeEventListeners';
const GlobalContext = createContext();
export const GlobalProvider = ({ children }) => {
    const [isScrollToBottom, setIsScrollToBottom] = useState(false);
    addEventListenerSafe(
        document.body,
        "scroll",
        (e) => {
            if (
                e.target.scrollHeight - e.target.scrollTop <=
                e.target.clientHeight + 10
            ) {
                setIsScrollToBottom(true)
            } else {
                setIsScrollToBottom(false)
            }
        }
    );
    const toggleIsScrollToBottom = () => {
        setIsScrollToBottom(prevFlag => !prevFlag);
    };

    return (
        <GlobalContext.Provider value={{ isScrollToBottom, toggleIsScrollToBottom }}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalContext;
