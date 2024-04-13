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
      y: -answerHeight,
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
      y: -answerHeight,
      paddingTop: 0,
      paddingBottom: 0,
    },
  });

  return (
    <div className="question-container">
      <img
        src={vIcon}
        alt="Toggle"
        className={isExpanded ? "v-icon rotated" : "v-icon"}
        onClick={() => {
          handleClick();
        }}
      />

      <div className="question-and-answer">
        <div className="title2 bold top-align white question-title">
          {question}
        </div>
        {expandTransition((style, item) =>
          item === true ? (
            <animated.div className="title2" style={style}>
              {answer}
            </animated.div>
          ) : (
            ""
          )
        )}
      </div>
    </div>
  );
};

export { Question };
