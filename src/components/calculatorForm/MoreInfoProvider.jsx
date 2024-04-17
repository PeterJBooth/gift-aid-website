import { FaRegQuestionCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useEffect, useRef, useState } from "react";

const MoreInfoProvider = ({ title, content }) => {
  const [showingInfoBox, setShowingInfoBox] = useState(false);

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
    <div className="relative ml-2">
      <FaRegQuestionCircle
        className="cursor-pointer pb-[0.15rem] text-blue-700 hover:text-blue-200 active:text-blue-700"
        size={14}
        onClick={() => {
          handleQuestionMarkClick();
        }}
      />
      {showingInfoBox === true && (
        <div
          // ref={infoBoxRef}
          className="information-box shadow-custom1 absolute left-1/2 top-9 z-50 flex w-[21rem] -translate-x-1/2 flex-col gap-5 rounded-md border border-neutral-100 bg-neutral-25 p-6 before:absolute before:-top-px before:right-1/2 before:size-6 before:-translate-y-1/2 before:translate-x-1/2 before:bg-neutral-25 before:content-[''] "
          onClick={() => RemoveInfoBox()}
        >
          <IoMdClose
            className="close-icon "
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
