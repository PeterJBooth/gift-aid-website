import { animated } from "@react-spring/web";
import { addCommasToNumber } from "../../utils/formatNumber";
import { forwardRef } from "react";

const InputDisplay = ({ props, inputRef, amount, title }) => {
  return (
    <animated.div className="relative w-60 tablet:w-72" style={props}>
      <div
        className="absolute left-0 right-0 flex flex-col gap-2"
        ref={inputRef}
      >
        {title && (
          <>
            <div className="text-right text-turquoise-600  tablet:text-2.5xl tablet:font-bold">
              £{addCommasToNumber(amount)}
            </div>
            <div className="text-right text-neutral-300 tablet:text-xl">
              {title}
            </div>{" "}
          </>
        )}
      </div>
    </animated.div>
  );
};

export { InputDisplay };
