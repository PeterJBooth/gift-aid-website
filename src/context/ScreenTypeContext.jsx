import { createContext, useContext } from "react";
import useScreenType from "react-screentype-hook";

const ScreenTypeContext = createContext();

const ScreenTypeContextProvider = (props) => {
  const screenType = useScreenType();

  // {
  //   largeDesktop: 1440,
  //   desktop: 992,
  //   tablet: 768,
  //   mobile: 320,
  // };

  return (
    <ScreenTypeContext.Provider value={{ screenType }}>
      {props.children}
    </ScreenTypeContext.Provider>
  );
};

const useScreenTypeContext = () => {
  return useContext(ScreenTypeContext);
};

export { ScreenTypeContextProvider, useScreenTypeContext };
