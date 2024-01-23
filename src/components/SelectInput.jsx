import { useState, useEffect, useRef } from "react";
import toogleIcon from "../assets/toggle.svg";

const SelectInput = ({ inputTitle }) => {
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

  return (
    <div className="select-input-container">
      <p className="input-title">{inputTitle}</p>
      <div className="select-input">
        <div className="single-select">
          <div className="select-value">Month</div>
          <img src={toogleIcon} alt="toggle" />
        </div>
        <div
          className="text-input-container"
          onClick={() => {
            setTextInputActive(true);
          }}
          ref={inputRef}
        >
          <div
            className={
              textInputActive ? "pound-placeholder active" : "pound-placeholder"
            }
          >
            £
          </div>
          <input
            type="number"
            className={textInputActive ? "text-input active" : "text-input"}
          ></input>
        </div>
      </div>
    </div>
  );
};

export { SelectInput };
