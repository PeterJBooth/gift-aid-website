import { createContext, useContext, useRef, useState } from "react";

const BreakdownContext = createContext();

const BreakdownContextProvider = (props) => {
  const breakdownSectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [incomeTaxCardIsExpanded, setIncomeTaxCardIsExpanded] = useState(false);
  const [pensionTaxCardIsExpanded, setPensionTaxCardIsExpanded] =
    useState(false);
  const [totalTaxCardIsExpanded, setTotalTaxCardIsExpanded] = useState(false);
  const [
    giftAidEligibilityCardIsExpanded,
    setGiftAidEligibilityCardIsExpanded,
  ] = useState(false);

  return (
    <BreakdownContext.Provider
      value={{ breakdownSectionRef, setIsVisible, isVisible }}
    >
      {props.children}
    </BreakdownContext.Provider>
  );
};

const useBreakdownContext = () => {
  return useContext(BreakdownContext);
};

export { BreakdownContextProvider, useBreakdownContext };
