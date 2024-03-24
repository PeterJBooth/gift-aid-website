import { animated } from "@react-spring/web";
import { BsExclamationTriangle } from "react-icons/bs";

const ValidationMessage = ({ style, message }) => {
  return (
    <animated.div style={style} className="message validation">
      <BsExclamationTriangle className="exclamation-triangle" />
      <p>{message}</p>
    </animated.div>
  );
};

export { ValidationMessage };
