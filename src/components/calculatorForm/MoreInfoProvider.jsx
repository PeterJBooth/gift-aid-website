import { FaRegQuestionCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useEffect, useRef, useState } from "react";

const MoreInfoProvider = ({ title, content }) => {
  const [showingInfoBox, setShowingInfoBox] = useState(false);
  // const [boxIsBelowQuestionMark, setBoxIsBelowQuestionMark] = useState(true);

  // const infoBoxRef = useRef();
  // const observer = useRef();

  // useEffect(() => {
  //   if (infoBoxRef.current != null && observer.current == null) {
  //     console.log(infoBoxRef);
  //     observer.current = new IntersectionObserver(
  //       (entries) => {
  //         const entry = entries[0];
  //         console.log("entry", entry);
  //         setBoxIsBelowQuestionMark(entry.isIntersecting);
  //       },
  //       { threshold: 1 }
  //     );

  //     observer.current.observe(infoBoxRef.current);
  //   }
  // }, [showingInfoBox]);

  const handleQuestionMarkClick = () => {
    if (showingInfoBox === false) {
      setShowingInfoBox(true);
    } else if (showingInfoBox === true) {
      setShowingInfoBox(false);
    }
  };

  const RemoveInfoBox = () => {
    setShowingInfoBox(false);
  };
  return (
    <div className="question-mark-info-box-container">
      <FaRegQuestionCircle
        className="question-mark"
        size={14}
        onClick={() => {
          handleQuestionMarkClick();
        }}
      />
      {showingInfoBox === true && (
        <div
          // ref={infoBoxRef}
          className="information-box"
          onClick={() => RemoveInfoBox()}
        >
          <IoMdClose
            className="close-icon"
            size={28}
            onClick={() => {
              RemoveInfoBox();
            }}
          />
          <div className="information-box-title">{title}</div>
          <div className="body">{content}</div>
        </div>
      )}
    </div>
  );
};

export { MoreInfoProvider };
