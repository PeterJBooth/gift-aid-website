import { useRef, useState } from "react";
import vIcon from "../assets/info-page/v-icon.svg";
import { animated, useSpring } from "@react-spring/web";

const Question = ({ question, answer }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const [props, api] = useSpring(() => ({ height: "0px" }), []);

  const answerRef = useRef(null);

  const handleClick = () => {
    if (!isExpanded) {
      setIsExpanded(true);
    } else {
      setIsExpanded(false);
    }
    api.start({
      from: {
        height: isExpanded ? answerRef.current.offsetHeight : 0,
        opacity: isExpanded ? 1 : 0,
      },
      to: {
        height: isExpanded ? 0 : answerRef.current.offsetHeight,
        opacity: isExpanded ? 0 : 1,
      },
    });
  };

  return (
    <div className="flex w-full items-start gap-8">
      <img
        src={vIcon}
        alt="Toggle"
        className={` mt-[0.20rem] cursor-pointer transition-all hover:opacity-70 ${isExpanded ? "v-icon" : "v-icon rotate-180"}`}
        onClick={() => {
          handleClick();
        }}
      />

      <div className="flex w-full flex-col items-start justify-start overflow-hidden">
        <div className="z-20 w-full bg-neutral-25 pb-1 font-bold leading-6 ">
          {question}
        </div>

        <animated.div
          className="relative grid w-full overflow-hidden text-wrap leading-6"
          style={{ ...props }}
        >
          <div
            ref={answerRef}
            className="absolute bottom-0 left-0 right-0 pt-5 leading-6"
          >
            {answer}
          </div>
        </animated.div>
      </div>
    </div>
  );
};

export { Question };
