import { createContext, useContext, useRef, useState } from "react";

const PopupContext = createContext();

const PopupContextProvider = (props) => {
  const [popupIsActive, setPopupIsActive] = useState(false);
  const breakdownSectionRef = useRef(null);

  return (
    <PopupContext.Provider
      value={{ popupIsActive, setPopupIsActive, breakdownSectionRef }}
    >
      {props.children}
    </PopupContext.Provider>
  );
};

const usePopupContext = () => {
  return useContext(PopupContext);
};

export { PopupContextProvider, usePopupContext };
