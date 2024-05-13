import { useRef, useState } from "react";
import vIcon from "../../assets/info-page/v-icon.svg";
import arrowIcon from "../../assets/arrow.svg";
import largeArrowIcon from "../../assets/large-arrow.svg";
import { useScreenTypeContext } from "../../context/ScreenTypeContext";
import { useSpring, animated, useTransition } from "@react-spring/web";
import { MoreInfoProvider } from "../calculatorForm/MoreInfoProvider";
import { addCommasToNumber, formatNumber } from "../../utils/formatNumber";
import { UseCalculatorContext } from "../../context/CalculatorContext";

const IncomeTaxCard = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { screenType } = useScreenTypeContext();
  const expandedSectionRef = useRef(null);
  const summaryInfoRef = useRef(null);
  const inputRef = useRef(null);

  const { eligibilityInformation } = UseCalculatorContext();

  // const eligibilityInformation = {
  //   grossIncome: 90000,
  //   convertedPensionContribution: 0,
  //   incomeTaxTable: [
  //     {
  //       name: "personalAllowance",
  //       displayName: "Personal Allowance",
  //       lowerLimit: 0,
  //       upperLimit: 12570,
  //       taxRate: 0,
  //       incomeInBand: 12570,
  //       taxAmount: 0,
  //     },
  //     {
  //       name: "basicRate",
  //       displayName: "Basic Rate",
  //       lowerLimit: 12570,
  //       upperLimit: 50270,
  //       taxRate: 20,
  //       incomeInBand: 37700,
  //       taxAmount: 7540,
  //     },
  //     {
  //       name: "higherRate",
  //       displayName: "Higher Rate",
  //       lowerLimit: 50270,
  //       upperLimit: 125140,
  //       taxRate: 40,
  //       incomeInBand: 39730,
  //       taxAmount: 15892,
  //     },
  //     {
  //       name: "additionalRate",
  //       displayName: "Additional Rate",
  //       lowerLimit: 125140,
  //       taxRate: 45,
  //       incomeInBand: 0,
  //       taxAmount: 0,
  //     },
  //   ],
  //   incomeTaxAmount: 23432,
  //   taxBand: {
  //     name: "higherRate",
  //     displayName: "Higher Rate",
  //     lowerLimit: 50270,
  //     upperLimit: 125140,
  //     taxRate: 40,
  //     incomeInBand: 39730,
  //     taxAmount: 15892,
  //   },
  //   pensionTaxReliefAmount: 0,
  //   convertedIncomeTaxAmount: 23432,
  //   convertedPensionTaxReliefAmount: 0,
  //   totalTaxPaid: 23432,
  //   giftAidToClaim: 2500,
  //   canClaimGiftAid: true,
  //   giftAidTaxRelief: 0,
  //   giftAidDonationCap: 93728,
  //   informationRetrieved: true,
  //   timeInterval: "Year",
  // };

  const [mainProps, mainApi] = useSpring(() => ({ height: "100px" }), []);
  const [insideProps, InsideApi] = useSpring(() => ({ y: 0 }), []);
  const [tableSectionProps, tableSectionApi] = useSpring(
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

  // const inputInfoTransition = useTransition(isExpanded === true, {
  //   from: {
  //     opacity: 0,
  //   },
  //   enter: {
  //     opacity: 1,
  //   },
  //   leave: {
  //     opacity: 0,
  //   },
  // });

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
    tableSectionApi.start({
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

  const displayRows = () => {
    if (eligibilityInformation.incomeTaxTable == null) return;

    return eligibilityInformation.incomeTaxTable.map((taxBand) => {
      return (
        <tr key={taxBand.name}>
          <td className="sticky left-0 border-b border-neutral-100  bg-white py-10 pr-4 leading-6">
            {taxBand.displayName}
          </td>
          <td className=" justify-end  border-b border-neutral-100 px-4 py-10 text-right leading-6">
            <div className="flex justify-end whitespace-nowrap">
              {taxBand.upperLimit
                ? "£" +
                  addCommasToNumber(taxBand.lowerLimit) +
                  " - £" +
                  addCommasToNumber(taxBand.upperLimit)
                : "Over £" + addCommasToNumber(taxBand.lowerLimit)}
              {taxBand.displayName === "Personal Allowance" &&
              eligibilityInformation.grossIncome > 100000 &&
              screenType.isMobile !== true ? (
                <MoreInfoProvider
                  title={"Personal Allowance Reduction"}
                  content={`Your personal allowance goes down by £1 for every £2 that your gross income is above £100,000.
                    
                    Your gross income is £${addCommasToNumber(eligibilityInformation.grossIncome)}. Therefore, your personal allowance has been reduced by £${addCommasToNumber(Math.max(eligibilityInformation.grossIncome - 100000, 0) * 2)}, and as result is £${addCommasToNumber(taxBand.upperLimit)}.`}
                />
              ) : (
                ""
              )}
            </div>
          </td>
          <td
            className={`max-w-4 border-b border-neutral-100 px-4 text-right leading-6  ${taxBand.incomeInBand !== 0 ? "" : "pr-8"}`}
          >
            {formatNumber(taxBand.incomeInBand)}
          </td>
          <td className=" border-b border-neutral-100 px-4 text-right leading-6">
            {addCommasToNumber(taxBand.taxRate)}%
          </td>
          <td
            className={` border-b border-neutral-100 pl-4  text-right ${taxBand.taxAmount !== 0 ? " pr-4" : "pr-8"}`}
          >
            {formatNumber(taxBand.taxAmount)}
          </td>
        </tr>
      );
    });
  };

  return (
    <div className=" shadow-custom3 relative flex flex-col gap-8 rounded-3xl bg-white px-8 py-10">
      <div className="flex w-full justify-between gap-8">
        <div
          className={` min-w-[105px] leading-5 transition-all ${isExpanded ? "text-xl tablet:text-2.5xl  tablet:leading-6" : "text-xl"} `}
        >
          Income Tax
        </div>
        <animated.div className={`relative w-32 `} style={inputProps}>
          <div
            className="absolute left-0 right-0 flex flex-col gap-2"
            ref={inputRef}
          >
            <div className=" text-right text-turquoise-600  tablet:text-2.5xl tablet:font-bold">
              £{addCommasToNumber(eligibilityInformation.grossIncome)}
            </div>
            <div className=" text-right text-neutral-300 tablet:text-xl">
              Yearly Income
            </div>
          </div>
        </animated.div>
      </div>
      <div className="flex w-full items-center justify-center">
        <animated.div
          className="relative w-full overflow-y-clip overflow-x-visible"
          style={{ ...mainProps }}
        >
          <animated.div
            className=" absolute left-0 right-0 top-0 flex flex-col gap-8 overflow-visible"
            ref={expandedSectionRef}
            style={{ ...insideProps }}
          >
            <animated.div
              className="mx-auto flex gap-2 pt-8 tablet:gap-3"
              ref={summaryInfoRef}
              style={{ ...summaryInfoProps }}
            >
              <div className=" flex flex-col gap-1 tablet:gap-2">
                <div className="text-right text-sm tablet:text-xl">
                  Yearly Income
                </div>
                <div className="text-right text-xl font-bold text-turquoise-600 tablet:text-2.5xl">
                  £{addCommasToNumber(eligibilityInformation.grossIncome)}
                </div>
              </div>
              <div>
                <img
                  src={
                    screenType.isDesktop || screenType.isLargeDesktop
                      ? largeArrowIcon
                      : arrowIcon
                  }
                  alt="Arrow pointing right"
                  className={` -mt-2 transition-all duration-500 desktop:-mt-4`}
                />
              </div>
              <div className="flex flex-col gap-1 tablet:gap-2">
                <div className=" whitespace-nowrap  text-sm tablet:text-xl">
                  Income Tax
                </div>
                <div className=" text-xl font-bold text-neutral-900 tablet:text-2.5xl">
                  £{addCommasToNumber(eligibilityInformation.incomeTaxAmount)}
                </div>
              </div>
            </animated.div>
            <animated.div style={{ ...tableSectionProps }}>
              <div className=" flex w-full flex-col gap-8 ">
                <div>
                  The table shows the tax rates you pay in each tax band
                </div>
                <div className="shadow-custom5 overflow-x-auto rounded-md tablet:shadow-none">
                  <table className="w-full min-w-[41rem] overflow-scroll overflow-x-auto rounded-md   tablet:table-fixed">
                    <thead>
                      <tr>
                        <th className="  sticky left-0 w-[20%] border-b  border-neutral-100 bg-white  py-4 pr-4 text-left font-normal text-neutral-400">
                          Band
                        </th>
                        <th className=" w-[20%] border-b border-neutral-100 px-4 text-right font-normal text-neutral-400">
                          Earnings Range
                        </th>
                        <th className=" w-[25%] border-b border-neutral-100 px-4 text-right font-normal text-neutral-400">
                          Amount Earned in Tax Band
                        </th>
                        <th className=" border-b border-neutral-100 px-4 text-right font-normal text-neutral-400">
                          Tax Rate
                        </th>
                        <th className="border-b border-neutral-100 pl-4  pr-4 text-right font-normal text-neutral-400">
                          Tax Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {displayRows()}
                      <tr>
                        <td className="   py-10 pr-4 leading-6"></td>
                        <td className="  px-4 text-right leading-6"></td>
                        <td className="max-w-4  px-4 text-right leading-6"></td>
                        <td className="  px-4 text-right leading-6"></td>
                        <td className="  pl-4  pr-4 text-right">
                          <div className=" flex justify-end gap-3 whitespace-nowrap">
                            <div className="text-neutral-400 ">Sum</div>
                            <div className="font-bold">
                              £
                              {addCommasToNumber(
                                eligibilityInformation.incomeTaxAmount,
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="mx-auto mt-8 flex flex-col items-center gap-2">
                <div className=" text-sm font-bold tablet:text-xl ">
                  Income Tax
                </div>
                <div className=" text-xl font-bold text-orange-400 tablet:text-2.5xl">
                  £{addCommasToNumber(eligibilityInformation.incomeTaxAmount)}
                </div>
              </div>
            </animated.div>
          </animated.div>
        </animated.div>
      </div>

      <img
        src={vIcon}
        alt="Toggle"
        className={`mx-auto mt-[0.20rem] w-5 cursor-pointer transition-all hover:opacity-70 ${isExpanded ? "v-icon" : "v-icon rotate-180"}`}
        onClick={() => {
          handleClick();
        }}
      />
    </div>
  );
};

export { IncomeTaxCard };
