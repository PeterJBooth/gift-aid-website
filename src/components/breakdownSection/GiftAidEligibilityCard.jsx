import { useEffect, useRef, useState } from "react";
import { useScreenTypeContext } from "../../context/ScreenTypeContext";
import { useSpring } from "@react-spring/web";
import { UseCalculatorContext } from "../../context/CalculatorContext";
import { CardHeading } from "./CardHeading";
import { ExpandToggle } from "./ExpandToggle";
import { GiftAidEligibilityCardContent } from "./GiftAidEligibilityCardContent";

const GiftAidEligibilityCard = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const expandedSectionRef = useRef(null);
  const summaryInfoRef = useRef(null);
  const inputRef = useRef(null);
  const { eligibilityInformation } = UseCalculatorContext();
  // 159 + (eligibilityInformation.canClaimGiftAid ? 75 : 150);

  const [mainProps, mainApi] = useSpring(() => ({ height: 0 }), []);
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
      animateExpandToggle(false);
    } else {
      setIsExpanded(true);
      animateExpandToggle(true);
    }
  };

  const animateExpandToggle = (expand) => {
    mainApi.start({
      from: {
        height: expand
          ? summaryInfoRef.current.offsetHeight
          : expandedSectionRef.current.offsetHeight -
            summaryInfoRef.current.offsetHeight -
            32,
      },
      to: {
        height: expand
          ? expandedSectionRef.current.offsetHeight -
            summaryInfoRef.current.offsetHeight -
            32
          : summaryInfoRef.current.offsetHeight,
      },
    });

    InsideApi.start({
      from: { y: expand ? 0 : -summaryInfoRef.current.offsetHeight - 32 },
      to: { y: expand ? -summaryInfoRef.current.offsetHeight - 32 : 0 },
    });

    expandedSectionApi.start({
      from: { opacity: expand ? 0 : 1 },
      to: { opacity: expand ? 1 : 0 },
    });

    summaryInfoApi.start({
      from: { opacity: expand ? 1 : 0 },
      to: { opacity: expand ? 0 : 1 },
    });

    inputApi.start({
      from: {
        opacity: expand ? 0 : 1,
        height: expand ? 0 : inputRef.current.offsetHeight,
      },
      to: {
        opacity: expand ? 1 : 0,
        height: expand ? inputRef.current.offsetHeight : 0,
      },
    });
  };

  const resetSummaryHeight = () => {
    mainApi.start({
      from: {
        height: 96,
      },
      to: {
        height: summaryInfoRef.current.offsetHeight,
      },
    });
  };

  const resetExpandedHeight = () => {
    mainApi.start({
      from: {
        height: 699,
      },
      to: {
        height:
          expandedSectionRef.current.offsetHeight -
          summaryInfoRef.current.offsetHeight -
          32,
      },
    });
    InsideApi.start({
      from: { y: 0 },
      to: { y: -summaryInfoRef.current.offsetHeight - 32 },
    });
  };

  useEffect(() => {
    if (isExpanded) {
      resetExpandedHeight();
    } else {
      resetSummaryHeight();
    }
  }, [eligibilityInformation]);

  return (
    <div className=" shadow-custom3 relative flex flex-col gap-8 rounded-3xl bg-white px-5 pb-6 pt-10 largePhone:px-8">
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
