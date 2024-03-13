import { UseCalculatorContext } from "../context/CalculatorContext";
import { IoInformationCircle } from "react-icons/io5";
import { BsExclamationTriangle } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import { useTransition, animated } from "@react-spring/web";

const ToggleInput = ({ id, setInputValue, inputValue }) => {
  const {
    pensionformat,
    setPensionformat,
    contributesToPension,
    activeSelectInput,
  } = UseCalculatorContext();
  const inputRef = useRef();
  const [isInvalidPercentage, setIsInvalidPercentage] = useState(false);

  const componentTransition = useTransition(contributesToPension, {
    from: { opacity: 0, y: -88, maxHeight: 0, paddingTop: 0, paddingBottom: 0 },
    enter: {
      opacity: 1,
      y: 0,
      maxHeight: 88,
      paddingTop: 16,
      paddingBottom: 8,
    },
    leave: {
      opacity: 0,
      y: -88,
      maxHeight: 0,
      paddingTop: 0,
      paddingBottom: 0,
    },
  });

  const informationMessageTransition = useTransition(
    pensionformat === "fixed amount" && contributesToPension === true,
    {
      from: {
        opacity: 0,
        y: 0,
        maxHeight: 0,
        paddingTop: 0,
        paddingBottom: 0,
      },
      enter: {
        opacity: 1,
        y: 0,
        maxHeight: 16,
        paddingTop: 8,
        paddingBottom: 8,
      },
      leave: {
        opacity: 0,
        y: contributesToPension === false ? 0 : 0,
        maxHeight: 0,
        paddingTop: 0,
        paddingBottom: 0,
      },
    }
  );

  const validationMessageTransition = useTransition(isInvalidPercentage, {
    from: {
      opacity: 0,
      y: 0,
      maxHeight: 0,
      paddingTop: 0,
      paddingBottom: 0,
    },
    enter: {
      opacity: 1,
      y: 0,
      maxHeight: 16,
      paddingTop: 8,
      paddingBottom: 8,
    },
    leave: {
      opacity: 0,
      y: contributesToPension === false ? 0 : 0,
      maxHeight: 0,
      paddingTop: 0,
      paddingBottom: 0,
    },
  });

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
      isInvalidPercentage === false &&
      activeSelectInput !== "pensionInput" &&
      (inputValue > 100 || inputValue < 0) &&
      pensionformat === "percentage";

    const inputedValidPercentage =
      isInvalidPercentage === true &&
      activeSelectInput !== "pensionInput" &&
      inputValue <= 100 &&
      inputValue >= 0;

    if (inputedInvalidPercentage) {
      setIsInvalidPercentage(true);
    }
    if (inputedValidPercentage || pensionformat !== "percentage") {
      setIsInvalidPercentage(false);
    }
  }, [activeSelectInput, pensionformat]);

  return (
    <>
      {componentTransition((style, item) =>
        item === true ? (
          <animated.div className="toggle-input-container" style={style}>
            <div className="input-title">Pension Contribution</div>
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
              ></input>
            </div>
          </animated.div>
        ) : (
          ""
        )
      )}
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
          <animated.div style={style} className="message validation">
            <BsExclamationTriangle className="exclamation-triangle" />
            <p>Pension contribution must between 0% and 100%</p>
          </animated.div>
        ) : (
          ""
        )
      )}
    </>
  );
};

export { ToggleInput };
