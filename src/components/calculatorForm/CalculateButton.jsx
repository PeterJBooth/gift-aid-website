import { UseCalculatorContext } from "../../context/CalculatorContext";
import { usePopupContext } from "../../context/PopupContext";

const CalculateButton = () => {
  const { validateFormInputs, determineGiftAidEligibility } =
    UseCalculatorContext();
  const { setPopupIsActive } = usePopupContext();

  const handleButtonClick = () => {
    const isValid = validateFormInputs();
    if (isValid) {
      const eligibilityInformation = determineGiftAidEligibility();
      if (eligibilityInformation.informationRetrieved === true) {
        setPopupIsActive(true);
      } else {
        setPopupIsActive(false);
      }
    }
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
