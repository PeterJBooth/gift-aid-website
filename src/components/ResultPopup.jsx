import checkMark from "../assets/check-mark2.svg";
import { animated } from "@react-spring/web";
import { UseCalculatorContext } from "../context/CalculatorContext";
import { IoMdClose } from "react-icons/io";
import { usePopupContext } from "../context/PopupContext";
import { useScreenTypeContext } from "../context/ScreenTypeContext";

const ResultPopup = ({ style }) => {
  const { eligibilityInformation } = UseCalculatorContext();
  const { screenType } = useScreenTypeContext();
  const { setPopupIsActive } = usePopupContext();

  const displayResultMessage = () => {
    if (eligibilityInformation.canClaimGiftAid) {
      return (
        <div className="result-message">
          You can tick the
          <br /> gift aid box!
          <img
            src={checkMark}
            alt="check mark"
            className="confirmation-checkmark"
          />
        </div>
      );
    } else {
      return (
        <div className="result-message">
          Sorry,
          <br /> you're unable tick the <br /> gift aid box
        </div>
      );
    }
  };

  const displayResultDescription = () => {
    if (Math.round(eligibilityInformation.giftAidDonationCap) !== 0) {
      return (
        <div className="result-description">
          {eligibilityInformation.canClaimGiftAid ? "You" : "However, you"} can
          donate up to around{" "}
          <b>
            £
            {addCommasToNumber(
              Math.round(eligibilityInformation.giftAidDonationCap)
            )}{" "}
            a {eligibilityInformation.timeInterval.toLowerCase()}
          </b>{" "}
          and still tick the gift aid box
        </div>
      );
    } else {
      return (
        <div className="result-description">
          You cannot donate any amount and tick the gift aid box
        </div>
      );
    }
  };

  function addCommasToNumber(number) {
    return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }

  const handleCloseButtonClick = () => {
    setPopupIsActive(false);
  };

  const handleBreakdownButtonClick = () => {
    if (screenType.isMobile || screenType.isTablet) {
      setPopupIsActive(false);
    }
  };

  return (
    <animated.div className="result-popup-container" style={style}>
      <div className="result-popup">
        <IoMdClose
          className="close-icon"
          size={28}
          onClick={() => {
            handleCloseButtonClick();
          }}
        />

        {displayResultMessage()}
        <div className="result-info-container">
          {displayResultDescription()}
          <button
            className="breakdown-button"
            onClick={() => {
              handleBreakdownButtonClick();
            }}
          >
            See Breakdown
          </button>
          <div className="result-notice">
            The calculation makes standard assumptions to determine how much you
            can gift aid. If you have any doubts, we recommend you reach out to
            the charity you wish to donate to.
          </div>
        </div>
      </div>
    </animated.div>
  );
};

export { ResultPopup };
