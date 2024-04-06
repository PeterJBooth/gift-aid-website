import { useTransition, animated } from "@react-spring/web";
import { UseCalculatorContext } from "../context/CalculatorContext";
import { CalculatorForm } from "./calculatorForm/CalculatorForm";
import { PageTitle } from "./PageTitle";
import { ResultPopup } from "./ResultPopup";
import { useScreenTypeContext } from "../context/ScreenTypeContext";
import { usePopupContext } from "../context/PopupContext";

const FormSection = () => {
  const { eligibilityInformation } = UseCalculatorContext();
  const { screenType } = useScreenTypeContext();
  const { popupIsActive } = usePopupContext();

  const resultPopupTransition = useTransition(
    eligibilityInformation.informationRetrieved === true &&
      popupIsActive === true,
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

  const mobileResultPopupTransition = useTransition(
    eligibilityInformation.informationRetrieved === true &&
      popupIsActive === true,
    {
      from: {
        transform: "translate(-50%, -56%)",
        opacity: 0,
      },
      enter: {
        transform: "translate(-50%, -50%)",

        opacity: 1,
      },
      leave: {
        transform: "translate(-50%, -56%)",

        opacity: 0,
      },
    }
  );

  const displayContent = () => {
    if (screenType.isDesktop || screenType.isLargeDesktop) {
      return (
        <>
          <CalculatorForm />
          {popupIsActive === false && <PageTitle />}

          {resultPopupTransition((style, item) =>
            item === true ? <ResultPopup style={style} /> : ""
          )}
        </>
      );
    } else {
      return (
        <>
          <PageTitle />
          <CalculatorForm />

          {mobileResultPopupTransition((style, item) =>
            item === true ? (
              <>
                <animated.div
                  className="dimmer"
                  style={{ opacity: style.opacity }}
                ></animated.div>
                <ResultPopup style={style} />
              </>
            ) : (
              ""
            )
          )}
        </>
      );
    }
  };

  return (
    <div className="calculator-and-result-container">
      {/* <div className="test"></div> */}
      {displayContent()}
    </div>
  );
};

export { FormSection };
