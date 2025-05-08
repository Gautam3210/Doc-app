import { createContext } from "react";
import { doctors } from "../assets/assets"; // Make sure doctors is exported correctly from assets

// Create context
export const AppContext = createContext();

// Context provider component
const AppContextProvider = (props) => {
  const currencySymbol = '$';

  const value = {
    doctors,
    currencySymbol,
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};



export default AppContextProvider;
