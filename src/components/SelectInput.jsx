import { useState, useEffect, useRef } from "react";
import toogleIcon from "../assets/toggle.svg";
import { UseCalculatorContext } from "../context/CalculatorContext";
import { ValidationMessage } from "./ValidationMessage";

const SelectInput = ({
  inputTitle,
  setSelectValue,
  setInputValue,
  id,
  validationMessageTransition,
  validationMessage,
  validationError,
}) => {
  const [textInputActive, setTextInputActive] = useState(false);
  let inputRef = useRef();
  const { activeSelectInput, validationErrors, removeValidationError } =
    UseCalculatorContext();

  const handleOptionChange = (e) => {
    setSelectValue(e.target.value);
    console.log(e.target.value);
    return;
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value !== "" ? Number(e.target.value) : null;
    setInputValue(inputValue);
    console.log(inputValue);

    const errorMessageIsRendered = validationErrors.includes(validationError);
    if (errorMessageIsRendered && inputValue != null) {
      removeValidationError(validationError);
    }
  };

  return (
    <>
      <div className="select-input-container">
        <p className="input-title">{inputTitle}</p>
        <div className="select-input">
          <div className="single-select">
            <select
              className="select-value"
              onChange={(e) => {
                handleOptionChange(e);
              }}
            >
              <option>Month</option>
              <option>Year</option>
            </select>
            <img src={toogleIcon} alt="toggle" className="select-toggle" />
          </div>
          <div
            className={
              activeSelectInput === id
                ? "text-input-container active"
                : "text-input-container"
            }
            onClick={() => {
              setTextInputActive(true);
            }}
            ref={inputRef}
          >
            <div className="pound-placeholder">£</div>
            <input
              type="number"
              className="text-input"
              min="1"
              onChange={(e) => handleInputChange(e)}
              id={id}
            ></input>
          </div>
        </div>
      </div>
      {validationMessageTransition((style, item) =>
        item === true ? (
          <ValidationMessage style={style} message={validationMessage} />
        ) : (
          ""
        )
      )}
    </>
  );
};

export { SelectInput };
