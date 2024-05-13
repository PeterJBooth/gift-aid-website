import { createContext, useContext, useEffect, useState } from "react";
import { getGiftAidEligibilityInformation } from "../calculate";
const CalculatorContext = createContext();

const CalculatorContextProvider = (props) => {
  const [selectedIncomeInterval, setSelectedIncomeInterval] = useState("Year");
  const [grossIncome, setGrossIncome] = useState(null);

  const [selectedDonationInterval, setSelectedDonationInterval] =
    useState("Year");
  const [donationAmount, setDonationAmount] = useState(null);
  const [livesInScotland, setLivesInScotland] = useState(false);

  const [contributesToPension, setContributesToPension] = useState(false);
  const [pensionFormat, setPensionFormat] = useState("percentage");
  const [pensionContribution, setPensionContribution] = useState(0);

  const [claimsAdditionalGiftAidRelief, setClaimsAdditionalGiftAidRelief] =
    useState(false);
  const [claimsAdditionalPensionRelief, setClaimsAdditionalPensionRelief] =
    useState(false);

  const [usingAdvancedOptions, setUsingAdvancedOptions] = useState(false);
  const [activeSelectInput, setActiveSelectInput] = useState("");

  const [validationErrors, setValidationErrors] = useState([]);

  const [eligibilityInformation, setEligibilityInformation] = useState({
    informationRetrieved: false,
  });

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
      pensionFormat === "percentage" &&
      (pensionContribution > 100 || pensionContribution < 0);

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
    const giftAidEligibilityInformation = getGiftAidEligibilityInformation(
      grossIncome,
      donationAmount,
      livesInScotland,
      pensionContribution,
      claimsAdditionalGiftAidRelief,
      claimsAdditionalPensionRelief,
      selectedIncomeInterval,
      selectedDonationInterval,
      pensionFormat,
    );

    setEligibilityInformation(giftAidEligibilityInformation);
    return giftAidEligibilityInformation;
  };

  return (
    <CalculatorContext.Provider
      value={{
        setSelectedIncomeInterval,
        setGrossIncome,
        grossIncome,
        setSelectedDonationInterval,
        setDonationAmount,
        setLivesInScotland,
        livesInScotland,
        setContributesToPension,
        contributesToPension,
        pensionFormat: pensionFormat,
        setPensionFormat: setPensionFormat,
        setUsingAdvancedOptions,
        usingAdvancedOptions,
        claimsAdditionalGiftAidRelief,
        claimsAdditionalPensionRelief,
        setClaimsAdditionalGiftAidRelief,
        setClaimsAdditionalPensionRelief,
        activeSelectInput,
        pensionContribution,
        setPensionContribution,
        validateFormInputs,
        validationErrors,
        removeValidationError,
        determineGiftAidEligibility,
        eligibilityInformation,
        selectedDonationInterval,
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
