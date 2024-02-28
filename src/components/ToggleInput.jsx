import { UseCalculatorContext } from "../context/CalculatorContext";
import { IoInformationCircle } from "react-icons/io5";
import { BsExclamationTriangle } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";

const ToggleInput = () => {
  const { pensionformat, setPensionformat } = UseCalculatorContext();
  const [textInputActive, setTextInputActive] = useState(false);

  const inputRef = useRef();
  const handleToggleSignClick = (elementClicked) => {
    if (
      elementClicked === "percentage-toggle" &&
      pensionformat !== "percentage"
    ) {
      setPensionformat("percentage");
    }

    if (elementClicked === "pound-toggle" && pensionformat !== "fixed amount") {
      setPensionformat("fixed amount");
    }
  };

  return (
    <div className="toggle-input-container">
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
          onClick={() => setTextInputActive(true)}
          ref={inputRef}
        ></input>
      </div>

      {pensionformat === "fixed amount" && (
        <div
          className={
            pensionformat === "fixed amount"
              ? "message information"
              : "message information hide"
          }
        >
          <IoInformationCircle className="information-circle" />
          <p>
            Please state your <b>monthly</b> pension contribution
          </p>
        </div>
      )}

      {/* <div
        className={
          pensionformat === "fixed amount"
            ? "message validation"
            : "message validation hide"
        }
      >
        <BsExclamationTriangle className="exclamation-triangle" />
        <p>Pension contribution must between 0% and 100%</p>
      </div> */}
    </div>
  );
};

export { ToggleInput };
