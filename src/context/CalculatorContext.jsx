import { createContext, useContext, useEffect, useState } from "react";

const CalculatorContext = createContext();

const CalculatorContextProvider = (props) => {
  const [selectedIncomeInterval, setSelectedIncomeInterval] = useState("Month");
  const [income, setIncome] = useState(0);

  const [selectedDonationInterval, setSelectedDonationInterval] =
    useState("Month");
  const [donationAmount, setDonationAmount] = useState(0);

  const [livesInScotland, setLivesScotland] = useState(false);
  const [contributesToPension, setContributesToPension] = useState(false);
  const [pensionformat, setPensionformat] = useState("percentage");
  const [pensionAmount, setPensionAmount] = useState(0);

  const [higherRateGiftAidRelief, setHigherRateGiftAidRelief] = useState(false);
  const [higherRatePensionRelief, setHigherRatePensionRelief] = useState(false);

  const [usingAdvancedOptions, setUsingAdvancedOptions] = useState(false);
  const [activeSelectInput, setActiveSelectInput] = useState("");

  useEffect(() => {
    const handler = (e) => {
      // console.log(
      //   `new value '${e.target.id}' old value '${activeSelectInput}'`
      // );

      if (e.target.id !== "") {
        setActiveSelectInput(e.target.id);
      }
      if (e.target.id === "" && activeSelectInput !== e.target.id) {
        setActiveSelectInput(e.target.id);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [activeSelectInput]);

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
        pensionformat,
        setPensionformat,
        setUsingAdvancedOptions,
        usingAdvancedOptions,
        setHigherRateGiftAidRelief,
        setHigherRatePensionRelief,
        activeSelectInput,
        pensionAmount,
        setPensionAmount,
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
