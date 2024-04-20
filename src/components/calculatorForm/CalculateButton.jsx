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
      className="calculate-button shadow-custom2 mt-4 flex cursor-pointer items-center justify-center rounded-md bg-orange-600 px-14 py-4  text-lg font-bold leading-[1.3rem] text-white transition-all duration-75 hover:bg-[#fa7900] active:bg-orange-600 active:shadow-none"
      onClick={() => {
        handleButtonClick();
      }}
    >
      Calculate
    </button>
  );
};

export { CalculateButton };
