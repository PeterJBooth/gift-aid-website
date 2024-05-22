import { forwardRef } from "react";
import { UseCalculatorContext } from "../../context/CalculatorContext";
import { InputDisplay } from "./InputDisplay";

const CardHeading = forwardRef(
  ({
    inputProps,
    inputRef,
    cardTitle,
    inputDisplayTitle,
    inputDisplayAmount,
    isExpanded,
    noWrap,
  }) => {
    return (
      <div className="flex w-full justify-between gap-8 ">
        <div
          className={`min-w-[135px] leading-6 transition-all ${isExpanded && !noWrap ? "" : "text-nowrap"} ${isExpanded ? "text-xl tablet:text-2.5xl  tablet:leading-6" : "text-xl"} `}
        >
          {cardTitle}
        </div>

        <InputDisplay
          props={inputProps}
          inputRef={inputRef}
          amount={inputDisplayAmount}
          title={inputDisplayTitle}
        />
      </div>
    );
  },
);

export { CardHeading };
