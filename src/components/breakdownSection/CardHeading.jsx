import { replaceSpacesWithHyphens } from "../../utils/replaceSpacesWithHyphens";
import { InputDisplay } from "./InputDisplay";

const CardHeading = ({
  inputProps,
  cardTitle,
  inputDisplayTitle,
  inputDisplayAmount,
  isExpanded,
  noWrap,
  inputRef,
}) => {
  return (
    <div className="flex w-full justify-between gap-8 ">
      <h2
        id={replaceSpacesWithHyphens(cardTitle)}
        className={`min-w-[135px] leading-6 transition-all ${isExpanded && !noWrap ? "" : "text-nowrap"} ${isExpanded ? "text-xl tablet:text-2.5xl  tablet:leading-6" : "text-xl"} `}
      >
        {cardTitle}
      </h2>

      <InputDisplay
        props={inputProps}
        inputRef={inputRef}
        amount={inputDisplayAmount}
        title={inputDisplayTitle}
      />
    </div>
  );
};

export { CardHeading };
