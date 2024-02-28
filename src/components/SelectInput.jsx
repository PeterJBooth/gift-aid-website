import { useState, useEffect, useRef } from "react";
import toogleIcon from "../assets/toggle.svg";
import { UseCalculatorContext } from "../context/CalculatorContext";

const SelectInput = ({ inputTitle, setSelectValue, setInputValue, id }) => {
  const [textInputActive, setTextInputActive] = useState(false);
  let inputRef = useRef();
  const { activeSelectInput } = UseCalculatorContext();

  const handleOptionChange = (e) => {
    setSelectValue(e.target.value);
    console.log(e.target.value);
    return;
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    console.log(e.target.value);
  };

  return (
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
  );
};

export { SelectInput };
