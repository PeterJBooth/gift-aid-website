import { useTransition } from "@react-spring/web";
import { UseCalculatorContext } from "../../context/CalculatorContext";
import { SelectInput } from "./SelectInput";
import { IncomeSelectInput } from "./IncomeSelectInput";
const SelectInputSection = () => {
  const {
    setGrossIncome,
    setSelectedDonationInterval,
    setDonationAmount,
    validationErrors,
  } = UseCalculatorContext();

  const transitionProperties = {
    from: {
      opacity: 0,
      maxHeight: 0,
      paddingTop: 0,
      paddingBottom: 0,
    },
    enter: {
      opacity: 1,
      maxHeight: 32,
      paddingBottom: 16,
    },
    leave: {
      opacity: 0,
      maxHeight: 0,
      paddingTop: 0,
      paddingBottom: 0,
    },
  };

  const incomeValidationMessageTransition = useTransition(
    validationErrors.includes("Missing Income Amount"),
    transitionProperties,
  );

  const donationValidationMessageTransition = useTransition(
    validationErrors.includes("Missing Donation Amount"),
    transitionProperties,
  );

  return (
    <>
      <IncomeSelectInput
        setInputValue={setGrossIncome}
        id="incomeInput"
        validationMessageTransition={incomeValidationMessageTransition}
        validationMessage="Income amount is Missing"
        validationError="Missing Income Amount"
      />
      <SelectInput
        inputTitle="Amount I want to Donate *"
        setSelectValue={setSelectedDonationInterval}
        setInputValue={setDonationAmount}
        id="donationInput"
        validationMessageTransition={donationValidationMessageTransition}
        validationMessage="Donation amount is Missing"
        validationError="Missing Donation Amount"
      />
    </>
  );
};

export { SelectInputSection };
