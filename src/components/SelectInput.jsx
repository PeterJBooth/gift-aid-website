import { useState, useEffect, useRef } from "react";
import toogleIcon from "../assets/toggle.svg";

const SelectInput = ({ inputTitle, setSelectValue, setInputValue }) => {
  const [textInputActive, setTextInputActive] = useState(false);
  let inputRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!inputRef.current.contains(e.target)) {
        setTextInputActive(false);
      }
    };
    document.addEventListener("mousedown", handler);
  });

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
            textInputActive
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
            onChange={(e) => handleInputChange(e)}
          ></input>
        </div>
      </div>
    </div>
  );
};

export { SelectInput };
