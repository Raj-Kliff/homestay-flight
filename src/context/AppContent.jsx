import { createContext, useState } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const [dropOffLocationType, setDropOffLocationType] = useState('oneWay')

    const value = {dropOffLocationType, setDropOffLocationType}

  return (
    <AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>);
};

export default AppContextProvider