import { useState } from "react";
import checkMark from "../../assets/check-mark.svg";
import { MoreInfoProvider } from "./MoreInfoProvider";

const CheckboxInput = ({
  title,
  setCheckboxState,
  checkboxState,
  zIndex,
  informationBox,
}) => {
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
      <div className="checkbox-title">
        {title}
        {informationBox && (
          <MoreInfoProvider
            title={informationBox.title}
            content={informationBox.content}
          />
        )}
      </div>
    </div>
  );
};
export { CheckboxInput };
