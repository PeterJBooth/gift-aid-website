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
    },
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
    },
  );

  const displayContent = () => {
    if (screenType.isDesktop || screenType.isLargeDesktop) {
      return (
        <>
          <CalculatorForm />
          {popupIsActive === false && <PageTitle />}

          {resultPopupTransition((style, item) =>
            item === true ? <ResultPopup style={style} /> : "",
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
                  className="fixed bottom-0 left-0 right-0 top-0 z-50 bg-[#7878785d]"
                  style={{ opacity: style.opacity }}
                ></animated.div>
                <ResultPopup style={style} />
              </>
            ) : (
              ""
            ),
          )}
        </>
      );
    }
  };

  return (
    <div className="calculator-and-result-container mx-auto my-40 flex w-full max-w-10xl flex-col items-center justify-between px-custom desktop:flex-row desktop:items-start ">
      {displayContent()}
    </div>
  );
};

export { FormSection };
