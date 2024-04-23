import { useState } from "react";
import vIcon from "../assets/info-page/v-icon.svg";
import { useTransition, animated } from "@react-spring/web";

const Question = ({ question, answer, answerHeight }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    if (!isExpanded) {
      setIsExpanded(true);
    } else {
      setIsExpanded(false);
    }
  };

  const expandTransition = useTransition(isExpanded === true, {
    from: {
      opacity: 0,
      maxHeight: 0,
      y: 0,
      // y: -answerHeight + 16,
      paddingTop: 0,
      paddingBottom: 0,
    },
    enter: {
      opacity: 1,
      maxHeight: answerHeight,
      y: 0,
      paddingTop: 16,
      paddingBottom: 0,
    },
    leave: {
      opacity: 0,
      maxHeight: 0,
      // y: -answerHeight + 16,
      y: 0,
      paddingTop: 0,
      paddingBottom: 0,
    },
  });

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

      <div className="flex flex-col items-start justify-start ">
        <div className="z-20 w-full bg-neutral-25 pb-2 font-bold leading-6">
          {question}
        </div>
        {expandTransition((style, item) =>
          item === true ? (
            <animated.div className="text-wrap leading-6" style={style}>
              {answer}
            </animated.div>
          ) : (
            ""
          ),
        )}
      </div>
    </div>
  );
};

export { Question };
