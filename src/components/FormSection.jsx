import { useTransition } from "@react-spring/web";
import { UseCalculatorContext } from "../context/CalculatorContext";
import { CalculatorForm } from "./calculatorForm/CalculatorForm";
import { PageTitle } from "./PageTitle";
import { ResultPopup } from "./ResultPopup";

const FormSection = () => {
  const { eligibilityInformation } = UseCalculatorContext();

  const resultPopupTransition = useTransition(
    eligibilityInformation.informationRetrieved === true,
    {
      from: {
        transform: "translateY(-2rem)",
        opacity: 0,
      },
      enter: {
        transform: "translateY(0rem)",

        opacity: 1,
      },
      leave: {
        transform: "translateY(2rem)",

        opacity: 0,
      },
    }
  );

  return (
    <div className="calculator-and-result-container">
      {/* <div className="test"></div> */}

      <CalculatorForm />
      {eligibilityInformation.informationRetrieved === false && <PageTitle />}

      {resultPopupTransition((style, item) =>
        item === true ? <ResultPopup style={style} /> : ""
      )}
    </div>
  );
};

export { FormSection };
