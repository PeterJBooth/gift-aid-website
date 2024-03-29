import { UseCalculatorContext } from "../../context/CalculatorContext";

const CalculateButton = () => {
  const { validateFormInputs, determineGiftAidEligibility } =
    UseCalculatorContext();

  const handleButtonClick = () => {
    const isValid = validateFormInputs();
    if (isValid) determineGiftAidEligibility();
  };

  return (
    <button
      className="calculate-button"
      onClick={() => {
        handleButtonClick();
      }}
    >
      Calculate
    </button>
  );
};

export { CalculateButton };
