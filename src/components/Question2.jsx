import { useRef, useState } from "react";
import vIcon from "../assets/info-page/v-icon.svg";
import { useTransition, animated, useSpring } from "@react-spring/web";
import { MdHeight } from "react-icons/md";

const Question = ({ question, answer, answerHeight }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const [props, api] = useSpring(() => ({ height: "0px" }), []);

  const testRef = useRef(null);

  const handleClick = () => {
    if (!isExpanded) {
      setIsExpanded(true);
    } else {
      setIsExpanded(false);
    }
    api.start({
      from: {
        height: isExpanded ? testRef.current.offsetHeight : 0,
        opacity: isExpanded ? 1 : 0,
      },
      to: {
        height: isExpanded ? 0 : testRef.current.offsetHeight,
        opacity: isExpanded ? 0 : 1,
      },
    });
  };

  const handleClick2 = () => {
    console.log(testRef.current.offsetHeight);
    // console.log(testRef);
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
        <div
          className="z-20 w-full bg-neutral-25 pb-1 font-bold leading-6 "
          onClick={handleClick2}
        >
          {question}
        </div>

        <animated.div
          className="relative grid w-full overflow-hidden text-wrap leading-6"
          style={{ ...props }}
        >
          <div
            ref={testRef}
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