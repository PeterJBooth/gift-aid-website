import { createContext, useContext, useState } from "react";

const CalculatorContext = createContext();

const CalculatorContextProvider = (props) => {
  const [selectedIncomeInterval, setSelectedIncomeInterval] = useState("Month");
  const [income, setIncome] = useState(0);

  const [selectedDonationInterval, setSelectedDonationInterval] =
    useState("Month");
  const [donationAmount, setDonationAmount] = useState(0);

  const [livesInScotland, setLivesScotland] = useState(false);
  const [contributesToPension, setContributesToPension] = useState(false);
  const [higherRateGiftAidRelief, setHigherRateGiftAidRelief] = useState(false);
  const [higherRatePensionRelief, setHigherRatePensionRelief] = useState(false);

  const [usingAdvancedOptions, setUsingAdvancedOptions] = useState(false);

  return (
    <CalculatorContext.Provider
      value={{
        setSelectedIncomeInterval,
        setIncome,
        setSelectedDonationInterval,
        setDonationAmount,
        setLivesScotland,
        setContributesToPension,
        contributesToPension,
        setUsingAdvancedOptions,
        usingAdvancedOptions,
        setHigherRateGiftAidRelief,
        setHigherRatePensionRelief,
      }}
    >
      {props.children}
    </CalculatorContext.Provider>
  );
};

const UseCalculatorContext = () => {
  return useContext(CalculatorContext);
};

export { CalculatorContext, CalculatorContextProvider, UseCalculatorContext };
