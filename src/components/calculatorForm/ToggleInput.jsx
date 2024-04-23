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

  const fixedAmount = "fixed amount";

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
        maxHeight: 24,
        paddingTop: 8,
        paddingBottom: 8,
      },
      leave: {
        opacity: 0,
        maxHeight: 0,
        paddingTop: 0,
        paddingBottom: 0,
      },
    },
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
        maxHeight: 24,
        paddingTop: 8,
        paddingBottom: 8,
      },
      leave: {
        opacity: 0,
        maxHeight: 0,
        paddingTop: 0,
        paddingBottom: 0,
      },
    },
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

    // console.log(pensionformat);
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
      <animated.div
        className="toggle-input-container z-30 flex flex-col bg-neutral-25"
        style={style}
      >
        <div className=" flex select-none text-lg font-bold leading-5">
          Pension Contribution
          <MoreInfoProvider
            title={"Pension Contribution"}
            content={`If you contribute to a pension via the PAYE system, please input themonthly amount here.

              This calculation assumes that you contribute to your pension from your net pay, thereby receiving tax relief on contributions from HMRC. If you are unsure if this the case, it is recommended to enter the amount you contribute anyway.
              
              You can enter the contribution as a percentage of your salary (e.g. 8%) or provide the actual amount you contribute per month (e.g. £300).)`}
          />
        </div>

        <div id="pension-select-input" className="flex pt-4">
          <div className="relative flex cursor-pointer select-none rounded-l-md border border-neutral-100 bg-neutral-50">
            <div
              className={`z-10 flex size-12 items-center justify-center text-center text-lg font-bold transition-colors ${
                pensionformat === "percentage" ? "text-neutral-25" : ""
              }`}
              onClick={() => {
                handleToggleSignClick("percentage-toggle");
              }}
            >
              %
            </div>
            <div
              className={`z-10 flex size-12 items-center justify-center text-center text-lg font-bold transition-colors ${
                pensionformat === fixedAmount ? "text-neutral-25" : ""
              }`}
              onClick={() => {
                handleToggleSignClick("pound-toggle");
              }}
            >
              £
            </div>
            <div
              className={`absolute left-0 size-12 rounded-md bg-blue-700 transition-all ${pensionformat === "percentage" ? "  translate-x-0" : "translate-x-full"}`}
            ></div>
          </div>
          <input
            type="number"
            className="text-input hover:border-blue-550 focus:border-blue-550 w-full rounded-r-md border border-neutral-100 bg-neutral-25 px-4 py-px hover:border-2 hover:px-[15px] hover:py-0 focus:border-2 focus:px-[15px] focus:py-0 focus:outline-none"
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
          <animated.div
            style={style}
            className="flex items-center gap-1 bg-neutral-25 text-xs2 text-blue-500"
          >
            <IoInformationCircle className="size-[0.9rem]" />
            <p>
              Please state your <b>monthly</b> pension contribution
            </p>
          </animated.div>
        ) : (
          ""
        ),
      )}
      {validationMessageTransition((style, item) =>
        item === true ? (
          <ValidationMessage
            message="Pension contribution must between 0% and 100%"
            style={style}
          />
        ) : (
          ""
        ),
      )}
    </>
  );
};

export { ToggleInput };
