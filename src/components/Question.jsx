import { useState } from "react";
import vIcon from "../assets/info-page/v-icon.svg";
import { useTransition } from "@react-spring/web";

const Question = ({ question, answer }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    if (!isExpanded) {
      setIsExpanded(true);
    } else {
      setIsExpanded(false);
    }
  };

  const expandTransition = useTransition(isExpanded, {
    from: {
      opacity: 0,
      maxHeight: 0,
      paddingTop: 0,
      paddingBottom: 0,
    },
    enter: {
      opacity: 1,
      maxHeight: 16,
      paddingTop: 8,
      paddingBottom: 8,
    },
    leave: {
      opacity: 0,
      maxHeight: 0,
      paddingTop: 0,
      paddingBottom: 0,
    },
  });

  return (
    <div className="question-container">
      <img
        src={vIcon}
        alt="Toggle"
        className="v-icon"
        onClick={() => {
          handleClick();
        }}
      />
      <div className="question-and-answer">
        <div className="title2 bold top-align">{question}</div>
        {expandTransition((style, item) =>
          item === true ? (
            <div className="title2" style={style}>
              {answer}
            </div>
          ) : (
            ""
          )
        )}
      </div>
    </div>
  );
};

export { Question };
