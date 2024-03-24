import { createContext, useContext, useEffect, useState } from "react";
import { calculateGiftAidEligibility } from "../calculate";
const CalculatorContext = createContext();

const CalculatorContextProvider = (props) => {
  const [selectedIncomeInterval, setSelectedIncomeInterval] = useState("Month");
  const [grossIncome, setGrossIncome] = useState(null);

  const [selectedDonationInterval, setSelectedDonationInterval] =
    useState("Month");
  const [donationAmount, setDonationAmount] = useState(null);

  const [livesInScotland, setLivesScotland] = useState(false);
  const [contributesToPension, setContributesToPension] = useState(false);
  const [pensionformat, setPensionformat] = useState("percentage");
  const [pensionAmount, setPensionAmount] = useState(0);

  const [claimsAdditionalGiftAidRelief, setClaimsAdditionalGiftAidRelief] =
    useState(false);
  const [claimsAdditionalPensionRelief, setClaimsAdditionalPensionRelief] =
    useState(false);

  const [usingAdvancedOptions, setUsingAdvancedOptions] = useState(false);
  const [activeSelectInput, setActiveSelectInput] = useState("");

  const [validationErrors, setValidationErrors] = useState([]);

  useEffect(() => {
    const handler = (e) => {
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

  const validateFormInputs = () => {
    console.log("validate");
    // Restart Validation
    const validationErrors = [];

    if (grossIncome == null || grossIncome === "") {
      validationErrors.push("Missing Income Amount");
    }

    if (donationAmount == null || grossIncome === "") {
      validationErrors.push("Missing Donation Amount");
    }

    const isInvalidPensionPercentage =
      pensionformat === "percentage" &&
      (pensionAmount > 100 || pensionAmount < 0);

    if (isInvalidPensionPercentage) {
      validationErrors.push("Invalid Pension Percentage");
    }

    setValidationErrors(validationErrors);
    console.log(validationErrors);

    const isValid = validationErrors.length === 0;
    return isValid;
  };

  const removeValidationError = (validationError) => {
    const newValidationErrors = validationErrors.filter((error) => {
      return error !== validationError;
    });

    console.log(newValidationErrors);
    setValidationErrors(newValidationErrors);
    return;
  };

  const determineGiftAidEligibility = () => {
    calculateGiftAidEligibility(
      grossIncome,
      donationAmount,
      livesInScotland,
      pensionAmount,
      claimsAdditionalGiftAidRelief,
      claimsAdditionalPensionRelief
    );
    // return;
  };

  return (
    <CalculatorContext.Provider
      value={{
        setSelectedIncomeInterval,
        setGrossIncome,
        setSelectedDonationInterval,
        setDonationAmount,
        setLivesScotland,
        setContributesToPension,
        contributesToPension,
        pensionformat,
        setPensionformat,
        setUsingAdvancedOptions,
        usingAdvancedOptions,
        setClaimsAdditionalGiftAidRelief,
        setClaimsAdditionalPensionRelief,
        activeSelectInput,
        pensionAmount,
        setPensionAmount,
        validateFormInputs,
        validationErrors,
        removeValidationError,
        determineGiftAidEligibility,
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
