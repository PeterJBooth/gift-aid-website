import { useRef, useState } from "react";
import { useScreenTypeContext } from "../../context/ScreenTypeContext";
import { useSpring } from "@react-spring/web";
import { UseCalculatorContext } from "../../context/CalculatorContext";
import { CardHeading } from "./CardHeading";
import { ExpandToggle } from "./ExpandToggle";
import { TotalTaxCardContent } from "./TotalTaxCardContent";

const TotalTaxCard = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { screenType } = useScreenTypeContext();
  const expandedSectionRef = useRef(null);
  const summaryInfoRef = useRef(null);
  const inputRef = useRef(null);

  const { eligibilityInformation } = UseCalculatorContext();

  const [mainProps, mainApi] = useSpring(
    () => ({ height: screenType.isMobile ? 52 : 64 }),
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
    eligibilityInformation.pensionContribution != null && (
      <div className=" shadow-custom3 relative flex flex-col gap-8 rounded-3xl bg-white px-8 py-10">
        <CardHeading
          inputProps={inputProps}
          inputRef={inputRef}
          cardTitle="Total Tax Paid"
          // inputDisplayTitle="Yearly Pension Contribution"
          // inputDisplayAmount={
          //   eligibilityInformation.convertedPensionContribution
          // }
          isExpanded={isExpanded}
        />

        <TotalTaxCardContent
          mainProps={mainProps}
          expandedSectionRef={expandedSectionRef}
          expandedSectionProps={expandedSectionProps}
          insideProps={insideProps}
          summaryInfoRef={summaryInfoRef}
          summaryInfoProps={summaryInfoProps}
        />

        <ExpandToggle handleClick={handleClick} isExpanded={isExpanded} />
      </div>
    )
  );
};

export { TotalTaxCard };
