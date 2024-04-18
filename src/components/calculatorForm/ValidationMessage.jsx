import { animated } from "@react-spring/web";
import { BsExclamationTriangle } from "react-icons/bs";

const ValidationMessage = ({ style, message }) => {
  return (
    <animated.div
      style={style}
      className="text-red flex items-center gap-1 bg-neutral-25 text-xs2"
    >
      <BsExclamationTriangle className="h-3 pb-[0.1rem]" />
      <p>{message}</p>
    </animated.div>
  );
};

export { ValidationMessage };
