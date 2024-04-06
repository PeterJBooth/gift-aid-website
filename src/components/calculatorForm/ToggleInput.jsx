import { UseCalculatorContext } from "../../context/CalculatorContext";
import { IoInformationCircle } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { useTransition, animated } from "@react-spring/web";
import { ValidationMessage } from "./ValidationMessage";
import { MoreInfoProvider } from "./MoreInfoProvider";

const ToggleInput = ({ id, setInputValue, inputValue, style }) => {
  const {
    pensionformat,
    setPensionformat,
    contributesToPension,
    activeSelectInput,
  } = UseCalculatorContext();

  const inputRef = useRef();
  const [validationMessageDisplayed, setvalidationMessageIsDisplayed] =
    useState(false);

  const informationMessageTransition = useTransition(
    pensionformat === "fixed amount" && contributesToPension === true,
    {
      from: {
        opacity: 0,
        maxHeight: 0,
        paddingTop: 0,
        paddingBottom: 0,
      },
      enter: {
        opacity: 1,
        maxHeight: 16,
        paddingTop: 8,
        paddingBottom: 8,
      },
      leave: {
        opacity: 0,
        maxHeight: 0,
        paddingTop: 0,
        paddingBottom: 0,
      },
    }
  );

  const validationMessageTransition = useTransition(
    validationMessageDisplayed && contributesToPension === true,
    {
      from: {
        opacity: 0,
        maxHeight: 0,
        paddingTop: 0,
        paddingBottom: 0,
      },
      enter: {
        opacity: 1,
        maxHeight: 16,
        paddingTop: 8,
        paddingBottom: 8,
      },
      leave: {
        opacity: 0,
        maxHeight: 0,
        paddingTop: 0,
        paddingBottom: 0,
      },
    }
  );

  const handleToggleSignClick = (elementClicked) => {
    if (
      elementClicked === "percentage-toggle" &&
      pensionformat !== "percentage"
    ) {
      setPensionformat("percentage");
      document.getElementById("pensionInput").value = "";
      setInputValue("");
    }

    if (elementClicked === "pound-toggle" && pensionformat !== "fixed amount") {
      setPensionformat("fixed amount");
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    // check for errors in input

    const inputedInvalidPercentage =
      validationMessageDisplayed === false &&
      activeSelectInput !== "pensionInput" &&
      (inputValue > 100 || inputValue < 0) &&
      pensionformat === "percentage";

    if (inputedInvalidPercentage) {
      setvalidationMessageIsDisplayed(true);
    }
    if (activeSelectInput === id || pensionformat !== "percentage") {
      setvalidationMessageIsDisplayed(false);
    }
  }, [activeSelectInput, pensionformat]);

  return (
    <>
      <animated.div className="toggle-input-container" style={style}>
        <div className="input-title">
          Pension Contribution
          <MoreInfoProvider
            title={"Pension Contribution"}
            content={`If you contribute to a pension via the PAYE system, please input themonthly amount here.

              This calculation assumes that you contribute to your pension from your net pay, thereby receiving tax relief on contributions from HMRC. If you are unsure if this the case, it is recommended to enter the amount you contribute anyway.
              
              You can enter the contribution as a percentage of your salary (e.g. 8%) or provide the actual amount you contribute per month (e.g. £300).)`}
          />
        </div>

        <div id="pension-select-input" className="toggle-input">
          <div className="toggle">
            <div
              className={
                pensionformat === "percentage"
                  ? "toggle-sign white-text"
                  : "toggle-sign"
              }
              onClick={() => {
                handleToggleSignClick("percentage-toggle");
              }}
            >
              %
            </div>
            <div
              className={
                pensionformat === "fixed amount"
                  ? "toggle-sign white-text"
                  : "toggle-sign"
              }
              onClick={() => {
                handleToggleSignClick("pound-toggle");
              }}
            >
              £
            </div>
            <div
              className={
                pensionformat === "percentage"
                  ? "toggle-slider left"
                  : "toggle-slider right"
              }
            ></div>
          </div>
          <input
            type="number"
            className="text-input"
            min="1"
            max={pensionformat === "percentage" ? "100" : ""}
            ref={inputRef}
            id={id}
            onChange={(e) => handleInputChange(e)}
            value={inputValue !== 0 ? inputValue : ""}
          ></input>
        </div>
      </animated.div>
      {informationMessageTransition((style, item) =>
        item === true ? (
          <animated.div style={style} className="message information">
            <IoInformationCircle className="information-circle" />
            <p>
              Please state your <b>monthly</b> pension contribution
            </p>
          </animated.div>
        ) : (
          ""
        )
      )}
      {validationMessageTransition((style, item) =>
        item === true ? (
          <ValidationMessage
            message="Pension contribution must between 0% and 100%"
            style={style}
          />
        ) : (
          ""
        )
      )}
    </>
  );
};

export { ToggleInput };
