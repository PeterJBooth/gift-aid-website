import { useRef, useState } from "react";
import vIcon from "../../assets/info-page/v-icon.svg";
import arrowIcon from "../../assets/arrow.svg";
import largeArrowIcon from "../../assets/large-arrow.svg";
import { useScreenTypeContext } from "../../context/ScreenTypeContext";
import { useSpring, animated } from "@react-spring/web";
import { addCommasToNumber } from "../../utils/formatNumber";
import { UseCalculatorContext } from "../../context/CalculatorContext";
import { InputDisplay } from "./InputDisplay";
import { CardHeading } from "./CardHeading";
import { ExpandToggle } from "./ExpandToggle";
import { GiftAidEligibilityCardContent } from "./GiftAidEligibilityCardContent";

const GiftAidEligibilityCard = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { screenType } = useScreenTypeContext();
  const expandedSectionRef = useRef(null);
  const summaryInfoRef = useRef(null);
  const inputRef = useRef(null);

  const { eligibilityInformation } = UseCalculatorContext();

  const [mainProps, mainApi] = useSpring(
    () => ({ height: screenType.isMobile ? 123 : 147 }),
    [],
  );
  const [insideProps, InsideApi] = useSpring(() => ({ y: 0 }), []);
  const [expandedSectionProps, expandedSectionApi] = useSpring(
    () => ({ opacity: 0 }),
    [],
  );
  const [summaryInfoProps, summaryInfoApi] = useSpring(
    () => ({ opacity: 1 }),
    [],
  );
  const [inputProps, inputApi] = useSpring(
    () => ({ opacity: 0, height: 0 }),
    [],
  );

  const handleClick = () => {
    if (isExpanded) {
      setIsExpanded(false);
    } else {
      setIsExpanded(true);
    }

    mainApi.start({
      from: {
        height: isExpanded
          ? expandedSectionRef.current.offsetHeight -
            summaryInfoRef.current.offsetHeight -
            32
          : summaryInfoRef.current.offsetHeight,
      },
      to: {
        height: isExpanded
          ? summaryInfoRef.current.offsetHeight
          : expandedSectionRef.current.offsetHeight -
            summaryInfoRef.current.offsetHeight -
            32,
      },
    });

    InsideApi.start({
      from: { y: isExpanded ? -summaryInfoRef.current.offsetHeight - 32 : 0 },
      to: { y: isExpanded ? 0 : -summaryInfoRef.current.offsetHeight - 32 },
    });

    expandedSectionApi.start({
      from: { opacity: isExpanded ? 1 : 0 },
      to: { opacity: isExpanded ? 0 : 1 },
    });

    summaryInfoApi.start({
      from: { opacity: isExpanded ? 0 : 1 },
      to: { opacity: isExpanded ? 1 : 0 },
    });

    inputApi.start({
      from: {
        opacity: isExpanded ? 1 : 0,
        height: isExpanded ? inputRef.current.offsetHeight : 0,
      },
      to: {
        opacity: isExpanded ? 0 : 1,
        height: isExpanded ? 0 : inputRef.current.offsetHeight,
      },
    });
  };

  return (
    <div className=" shadow-custom3 relative flex flex-col gap-8 rounded-3xl bg-white px-8 py-10">
      <CardHeading
        inputProps={inputProps}
        inputRef={inputRef}
        cardTitle="Gift Aid Eligibility"
        inputDisplayTitle="Total Tax Paid"
        inputDisplayAmount={eligibilityInformation.totalTaxPaid}
        isExpanded={isExpanded}
        noWrap={true}
      />

      <GiftAidEligibilityCardContent
        mainProps={mainProps}
        expandedSectionRef={expandedSectionRef}
        expandedSectionProps={expandedSectionProps}
        insideProps={insideProps}
        summaryInfoRef={summaryInfoRef}
        summaryInfoProps={summaryInfoProps}
      />

      <ExpandToggle handleClick={handleClick} isExpanded={isExpanded} />
    </div>
  );
};

export { GiftAidEligibilityCard };
