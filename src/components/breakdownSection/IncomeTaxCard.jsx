import { useRef, useState } from "react";
import { useSpring } from "@react-spring/web";
import { UseCalculatorContext } from "../../context/CalculatorContext";
import { CardHeading } from "./CardHeading";
import { IncomeTaxCardContent } from "./IncomeTaxCardContent";
import { ExpandToggle } from "./ExpandToggle";

const IncomeTaxCard = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const expandedSectionRef = useRef(null);
  const summaryInfoRef = useRef(null);
  const inputRef = useRef(null);

  const { eligibilityInformation } = UseCalculatorContext();

  const [mainProps, mainApi] = useSpring(() => ({ height: "100px" }), []);
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

  // const displayRows = () => {
  //   if (eligibilityInformation.incomeTaxTable == null) return;

  //   return eligibilityInformation.incomeTaxTable.map((taxBand) => {
  //     return (
  //       <tr key={taxBand.name}>
  //         <td className="sticky left-0 border-b border-neutral-100  bg-white py-10 pr-4 leading-6">
  //           {taxBand.displayName}
  //         </td>
  //         <td className=" justify-end  border-b border-neutral-100 px-4 py-10 text-right leading-6">
  //           <div className="flex justify-end whitespace-nowrap">
  //             {taxBand.upperLimit
  //               ? "£" +
  //                 addCommasToNumber(taxBand.lowerLimit) +
  //                 " - £" +
  //                 addCommasToNumber(taxBand.upperLimit)
  //               : "Over £" + addCommasToNumber(taxBand.lowerLimit)}
  //             {taxBand.displayName === "Personal Allowance" &&
  //             eligibilityInformation.grossIncome > 100000 &&
  //             screenType.isMobile !== true ? (
  //               <MoreInfoProvider
  //                 title={"Personal Allowance Reduction"}
  //                 content={`Your personal allowance goes down by £1 for every £2 that your gross income is above £100,000.

  //                   Your gross income is £${addCommasToNumber(eligibilityInformation.grossIncome)}. Therefore, your personal allowance has been reduced by £${addCommasToNumber(Math.max(eligibilityInformation.grossIncome - 100000, 0) * 2)}, and as result is £${addCommasToNumber(taxBand.upperLimit)}.`}
  //               />
  //             ) : (
  //               ""
  //             )}
  //           </div>
  //         </td>
  //         <td
  //           className={`max-w-4 border-b border-neutral-100 px-4 text-right leading-6  ${taxBand.incomeInBand !== 0 ? "" : "pr-8"}`}
  //         >
  //           {formatNumber(taxBand.incomeInBand)}
  //         </td>
  //         <td className=" border-b border-neutral-100 px-4 text-right leading-6">
  //           {addCommasToNumber(taxBand.taxRate)}%
  //         </td>
  //         <td
  //           className={` border-b border-neutral-100 pl-4  text-right ${taxBand.taxAmount !== 0 ? " pr-4" : "pr-8"}`}
  //         >
  //           {formatNumber(taxBand.taxAmount)}
  //         </td>
  //       </tr>
  //     );
  //   });
  // };

  return (
    <div className=" shadow-custom3 relative flex flex-col gap-8 rounded-3xl bg-white px-8 py-10">
      <CardHeading
        inputProps={inputProps}
        inputRef={inputRef}
        cardTitle="Income Tax"
        inputDisplayTitle="Yearly Income"
        inputDisplayAmount={eligibilityInformation.grossIncome}
        isExpanded={isExpanded}
      />
      <IncomeTaxCardContent
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

export { IncomeTaxCard };
