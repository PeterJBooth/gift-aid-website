import { useState } from "react";
import checkMark from "../assets/check-mark.svg";

const CheckboxInput = ({ title, setState }) => {
  const [isTicked, setIsTicked] = useState(false);

  const clickCheckbox = () => {
    if (isTicked === true) {
      setIsTicked(false);
      setState(false);
    } else {
      setIsTicked(true);
      setState(true);
    }
  };

  return (
    <div className="checkbox-container">
      <div
        className={isTicked ? "checkbox ticked" : "checkbox"}
        onClick={() => {
          clickCheckbox();
        }}
      >
        {isTicked === true && (
          <img className="check-mark" src={checkMark} alt="check mark" />
        )}
      </div>
      <p className="checkbox-title">{title}</p>
    </div>
  );
};
export { CheckboxInput };
