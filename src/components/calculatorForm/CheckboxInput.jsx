import { useState } from "react";
import checkMark from "../../assets/check-mark.svg";

const CheckboxInput = ({ title, setCheckboxState, checkboxState, zIndex }) => {
  const clickCheckbox = () => {
    if (checkboxState === true) {
      setCheckboxState(false);
    } else {
      setCheckboxState(true);
    }
  };

  return (
    <div className="checkbox-container" style={{ zIndex: zIndex }}>
      <div
        className={checkboxState ? "checkbox ticked" : "checkbox"}
        onClick={() => {
          clickCheckbox();
        }}
      >
        {checkboxState === true && (
          <img className="check-mark" src={checkMark} alt="check mark" />
        )}
      </div>
      <p className="checkbox-title">{title}</p>
    </div>
  );
};
export { CheckboxInput };
