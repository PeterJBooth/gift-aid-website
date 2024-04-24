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
    <div
      className="z-20 flex gap-4 bg-neutral-25 py-4"
      style={{ zIndex: zIndex }}
    >
      <div
        className={`box-content flex size-5 cursor-pointer items-center rounded-[0.1875rem] border-[1.5px] border-neutral-100 hover:border-blue-700 ${checkboxState ? " bg-blue-700" : ""}`}
        onClick={() => {
          clickCheckbox();
        }}
      >
        {checkboxState === true && (
          <img className="h-5 stroke-[3px]" src={checkMark} alt="check mark" />
        )}
      </div>
      <div className="leading-0 flex max-w-[calc(100%-39px)] select-none text-lg font-bold leading-5">
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
