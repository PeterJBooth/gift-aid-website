import { useState, useEffect, useRef } from "react";
import toogleIcon from "../../assets/toggle.svg";
import { UseCalculatorContext } from "../../context/CalculatorContext";
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
    return;
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value !== "" ? Number(e.target.value) : null;
    setInputValue(inputValue);

    const errorMessageIsRendered = validationErrors.includes(validationError);
    if (errorMessageIsRendered && inputValue != null) {
      removeValidationError(validationError);
    }
  };

  return (
    <>
      <div className="flex w-full flex-col gap-4 py-4">
        <p className="flex select-none text-lg font-bold">{inputTitle}</p>
        <div className="flex">
          <div className="single-select relative z-20 rounded-l-md border border-neutral-100 bg-neutral-50 ">
            <select
              className="cursor-pointer rounded-l-md bg-neutral-50 py-4 pl-2 pr-5 text-center text-sm font-bold text-neutral-700"
              onChange={(e) => {
                handleOptionChange(e);
              }}
            >
              <option>Year</option>
              <option>Month</option>
            </select>
            <img
              src={toogleIcon}
              alt="toggle"
              className="select-toggle pointer-events-none absolute right-[0.1rem] top-[4%] h-[94%] w-5 overflow-hidden bg-neutral-50 pr-2"
            />
          </div>
          <div
            className={`hover:border-blue-550 flex rounded-r-md border p-px hover:border-2${
              activeSelectInput === id
                ? " border-blue-550 border-2 p-0"
                : " border-neutral-100 hover:p-0"
            }`}
            onClick={() => {
              setTextInputActive(true);
            }}
            ref={inputRef}
          >
            <div
              className={`flex items-center justify-end pl-2 ${activeSelectInput === id ? "" : ""}`}
            >
              £
            </div>
            <input
              type="number"
              className="text-input box-border w-full rounded-r-md bg-neutral-25 pl-4 pr-2 text-lg outline-none"
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
        ),
      )}
    </>
  );
};

export { SelectInput };
