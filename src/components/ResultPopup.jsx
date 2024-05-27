import { animated } from "@react-spring/web";
import { UseCalculatorContext } from "../context/CalculatorContext";
import { IoMdClose } from "react-icons/io";
import { usePopupContext } from "../context/PopupContext";
import { useScreenTypeContext } from "../context/ScreenTypeContext";
import { useBreakdownContext } from "../context/BreakdownContext";
import { ResultMessage } from "./ResultMessage";
import { useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const ResultPopup = ({ style }) => {
  const { eligibilityInformation } = UseCalculatorContext();
  const { screenType } = useScreenTypeContext();
  const { setPopupIsActive } = usePopupContext();
  const { breakdownSectionRef, setIsVisible } = useBreakdownContext();

  const navigate = useNavigate();

  const displayResultDescription = () => {
    if (Math.round(eligibilityInformation.giftAidDonationCap) !== 0) {
      return (
        <p className="max-w-[19rem] leading-6 text-neutral-25">
          {eligibilityInformation.canClaimGiftAid ? "You" : "However, you"} can
          donate up to around{" "}
          <b>
            £
            {addCommasToNumber(
              Math.round(eligibilityInformation.giftAidDonationCap),
            )}{" "}
            a {eligibilityInformation.selectedDonationInterval.toLowerCase()}
          </b>{" "}
          and still tick the gift aid box
        </p>
      );
    } else {
      return (
        <p className="max-w-[19rem] leading-6 text-neutral-25">
          You cannot donate any amount and tick the gift aid box
        </p>
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
    setIsVisible(true);
    setTimeout(() => {
      breakdownSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <animated.section
      className="result-popup-container fixed left-1/2 top-1/2 z-50 min-w-[min(30.8rem,95%)] -translate-x-1/2 -translate-y-1/2 pt-4 desktop:static "
      style={style}
      aria-labelledby="result-title"
    >
      <div className="flex flex-col items-center rounded-[46px] bg-blue-700 px-8 pb-10 pt-28 text-center largePhone:px-10 largeDesktop:px-20 largeDesktop:pb-12 largeDesktop:pt-32">
        <IoMdClose
          className="absolute right-8 top-11 cursor-pointer text-neutral-100 hover:text-neutral-50 active:text-neutral-100 desktop:hidden"
          size={28}
          onClick={() => {
            handleCloseButtonClick();
          }}
        />

        <ResultMessage
          canClaimGiftAid={eligibilityInformation.canClaimGiftAid}
          id="result-title"
        />
        <div className="mt-14 flex flex-col items-center ">
          {displayResultDescription()}
          <button
            className=" mt-4 cursor-pointer rounded-lg bg-blue-400 px-5 py-4 text-xl text-neutral-25 transition-all duration-75 hover:bg-blue-300 active:bg-blue-400 "
            onClick={() => {
              handleBreakdownButtonClick();
            }}
          >
            See Breakdown
          </button>
          <p className=" mt-8 max-w-[27.8rem] text-xs2 leading-4 text-neutral-50  ">
            The calculation makes standard{" "}
            <HashLink
              className="font-bold underline"
              to="/what-is-gift-aid#assumptions-section"
            >
              assumptions
            </HashLink>{" "}
            to determine how much you can gift aid. If you have any doubts, we
            recommend you reach out to the charity you wish to donate to.
          </p>
        </div>
      </div>
    </animated.section>
  );
};

export { ResultPopup };
