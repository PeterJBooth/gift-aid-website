import { useRef, useState } from "react";
import vIcon from "../assets/info-page/v-icon.svg";
import arrowIcon from "../assets/arrow.svg";
import largeArrowIcon from "../assets/large-arrow.svg";
import { useScreenTypeContext } from "../context/ScreenTypeContext";
import { UseCalculatorContext } from "../context/CalculatorContext";
import { useSpring, animated, useTransition } from "@react-spring/web";

const IncomeTaxCard = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { screenType } = useScreenTypeContext();
  const { grossIncome } = UseCalculatorContext();
  const expandedSectionRef = useRef(null);

  const [props, api] = useSpring(() => ({ height: "0px" }), []);

  const eligibilityInformation = {
    grossIncome: 90000,
    convertedPensionContribution: 0,
    incomeTaxTable: [
      {
        name: "personalAllowance",
        displayName: "Personal Allowance",
        lowerLimit: 0,
        upperLimit: 12570,
        taxRate: 0,
        incomeInBand: 12570,
        taxAmount: 0,
      },
      {
        name: "basicRate",
        displayName: "Basic Rate",
        lowerLimit: 12570,
        upperLimit: 50270,
        taxRate: 20,
        incomeInBand: 37700,
        taxAmount: 7540,
      },
      {
        name: "higherRate",
        displayName: "Higher Rate",
        lowerLimit: 50270,
        upperLimit: 125140,
        taxRate: 40,
        incomeInBand: 39730,
        taxAmount: 15892,
      },
      {
        name: "additionalRate",
        displayName: "Additional Rate",
        lowerLimit: 125140,
        taxRate: 45,
        incomeInBand: 0,
        taxAmount: 0,
      },
    ],
    incomeTaxAmount: 23432,
    taxBand: {
      name: "higherRate",
      displayName: "Higher Rate",
      lowerLimit: 50270,
      upperLimit: 125140,
      taxRate: 40,
      incomeInBand: 39730,
      taxAmount: 15892,
    },
    pensionTaxReliefAmount: 0,
    convertedIncomeTaxAmount: 23432,
    convertedPensionTaxReliefAmount: 0,
    totalTaxPaid: 23432,
    giftAidToClaim: 2500,
    canClaimGiftAid: true,
    giftAidTaxRelief: 0,
    giftAidDonationCap: 93728,
    informationRetrieved: true,
    timeInterval: "Year",
  };

  const summaryInformationTransition = useTransition(!isExpanded, {
    from: {
      opacity: 1,
      y: 0,
    },
    enter: {
      opacity: 1,
      y: 0,
    },
    leave: {
      opacity: 0,
      y: -30,
      maxHeight: 0,
      padding: 0,
    },
  });

  const handleClick = () => {
    if (isExpanded) {
      setIsExpanded(false);
    } else {
      setIsExpanded(true);
    }

    api.start({
      from: {
        height: isExpanded ? expandedSectionRef.current.offsetHeight : 0,
        opacity: isExpanded ? 1 : 0,
      },
      to: {
        height: isExpanded ? 0 : expandedSectionRef.current.offsetHeight,
        opacity: isExpanded ? 0 : 1,
      },
    });
  };

  const displayRows = () => {
    if (eligibilityInformation.incomeTaxTable == null) return;

    return eligibilityInformation.incomeTaxTable.map((taxBand) => {
      return (
        <tr key={taxBand.name}>
          <td className=" border-b border-neutral-100  py-10 pr-4 leading-6">
            {taxBand.displayName}
          </td>
          <td className=" border-b border-neutral-100 px-4 text-right leading-6">
            {taxBand.upperLimit
              ? "£" +
                addCommasToNumber(taxBand.lowerLimit) +
                " - £" +
                addCommasToNumber(taxBand.upperLimit)
              : "Over £" + addCommasToNumber(taxBand.lowerLimit)}
          </td>
          <td
            className={`  max-w-4 border-b border-neutral-100 px-4 text-right leading-6  ${taxBand.incomeInBand !== 0 ? "" : "pr-8"}`}
          >
            {formatNumber(taxBand.incomeInBand)}
          </td>
          <td className=" border-b border-neutral-100 px-4 text-right leading-6">
            {addCommasToNumber(taxBand.taxRate)}%
          </td>
          <td
            className={` border-b border-neutral-100 pl-4  text-right ${taxBand.taxAmount !== 0 ? "" : "pr-4"}`}
          >
            {formatNumber(taxBand.taxAmount)}
          </td>
        </tr>
      );
    });
  };

  return (
    <div className=" relative flex flex-col gap-8 rounded-3xl bg-white px-8 py-10 shadow-xl">
      <div className="flex w-full justify-between">
        <div
          className={` leading-5   transition-all ${isExpanded ? "tablet:text-2.5xl   tablet:leading-6" : "text-xl"} `}
        >
          Income Tax
        </div>
        {isExpanded && (
          <div className="flex flex-col gap-2">
            <div className=" tablet:text-2.5xl text-right  text-turquoise-600 tablet:font-bold">
              £{addCommasToNumber(eligibilityInformation.grossIncome)}
            </div>
            <div className=" text-right text-neutral-300 tablet:text-xl">
              Income
            </div>
          </div>
        )}
      </div>
      <div>The table shows the tax rates you pay in each tax band</div>
      {summaryInformationTransition((style, item) =>
        item === true ? (
          <animated.div
            className="mx-auto flex gap-2 tablet:gap-3"
            style={style}
          >
            <div>
              <div className=" text-right text-sm tablet:text-xl">Income</div>
              <div className="  tablet:text-2.5xl text-xl font-bold text-turquoise-600">
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
            <div>
              <div className=" whitespace-nowrap  text-sm tablet:text-xl">
                Income tax
              </div>
              <div className=" tablet:text-2.5xl text-xl font-bold text-neutral-900">
                £{addCommasToNumber(eligibilityInformation.incomeTaxAmount)}
              </div>
            </div>
          </animated.div>
        ) : (
          ""
        ),
      )}
      <animated.div
        className="relative w-full overflow-hidden"
        style={{ ...props }}
      >
        <div
          className=" absolute left-0 right-0 top-0 "
          ref={expandedSectionRef}
        >
          <div className="w-full overflow-x-auto ">
            <table className="w-full largePhone:table-fixed">
              <thead>
                <tr className="">
                  <th className=" w-[20%]  border-b border-neutral-100  py-4 pr-4 text-left font-normal text-neutral-400">
                    Band
                  </th>
                  <th className=" w-[20%] min-w-28 border-b border-neutral-100 px-4 text-right font-normal text-neutral-400">
                    Earnings Range
                  </th>
                  <th className=" w-[25%] border-b border-neutral-100 px-4 text-right font-normal text-neutral-400">
                    Amount Earned in Tax Band
                  </th>
                  <th className=" border-b border-neutral-100 px-4 text-right font-normal text-neutral-400">
                    Tax Rate
                  </th>
                  <th className=" border-b border-neutral-100 pl-4 text-right font-normal text-neutral-400">
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
                  <td className="  pl-4  text-right">
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
          <div className="mx-auto flex flex-col items-center gap-2">
            <div className=" text-sm font-bold tablet:text-xl ">Income Tax</div>
            <div className=" tablet:text-2.5xl text-xl font-bold text-orange-400">
              £{addCommasToNumber(eligibilityInformation.incomeTaxAmount)}
            </div>
          </div>
        </div>
      </animated.div>
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

function formatNumber(number) {
  if (number == null || number === 0) return "-";

  number = addCommasToNumber(number);
  return "£" + number;
}

function addCommasToNumber(number) {
  if (number == null) return "";

  // return number;
  return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

export { IncomeTaxCard };
