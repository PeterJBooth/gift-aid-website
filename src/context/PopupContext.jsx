import { createContext, useContext, useState } from "react";

const PopupContext = createContext();

const PopupContextProvider = (props) => {
  const [popupIsActive, setPopupIsActive] = useState(false);

  return (
    <PopupContext.Provider value={{ popupIsActive, setPopupIsActive }}>
      {props.children}
    </PopupContext.Provider>
  );
};

const usePopupContext = () => {
  return useContext(PopupContext);
};

export { PopupContextProvider, usePopupContext };
