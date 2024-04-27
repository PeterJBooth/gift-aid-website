import { useState } from "react";
import vIcon from "../assets/info-page/v-icon.svg";
import arrowIcon from "../assets/arrow.svg";
import largeArrowIcon from "../assets/large-arrow.svg";
import { useScreenTypeContext } from "../context/ScreenTypeContext";

const IncomeTaxCard = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { screenType } = useScreenTypeContext();
  const handleClick = () => {
    if (isExpanded) {
      setIsExpanded(false);
    } else {
      setIsExpanded(true);
    }
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

  const displayRows = () => {
    const incomeTaxTable = [
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
        incomeInBand: 49730,
        taxAmount: 19892,
      },
      {
        name: "additionalRate",
        displayName: "Additional Rate",
        lowerLimit: 125140,
        taxRate: 45,
        incomeInBand: 0,
        taxAmount: 0,
      },
    ];

    return incomeTaxTable.map((taxBand) => {
      return (
        <tr key={taxBand.name}>
          <td className=" border-b border-neutral-100 py-10">
            {taxBand.displayName}
          </td>
          <td className="border-b border-neutral-100 text-right">
            {taxBand.upperLimit
              ? "£" +
                addCommasToNumber(taxBand.lowerLimit) +
                "- £" +
                addCommasToNumber(taxBand.upperLimit)
              : "Over £" + addCommasToNumber(taxBand.lowerLimit)}
          </td>
          <td className="border-b border-neutral-100 text-right">
            {formatNumber(taxBand.incomeInBand)}
          </td>
          <td className="border-b border-neutral-100 text-right">
            {addCommasToNumber(taxBand.taxRate)}%
          </td>
          <td
            className={`border-b border-neutral-100 ${taxBand.taxAmount !== 0 ? "text-right" : "text-center"}`}
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
          className={` leading-5   transition-all ${isExpanded ? "tablet:text-2.5xl  text-xl  tablet:leading-6" : "text-xl"} `}
        >
          Income Tax
        </div>
        <div className="flex flex-col gap-2">
          <div className=" text-right text-turquoise-600">£30,000</div>
          <div className=" text-right text-neutral-300">Income</div>
        </div>
      </div>
      <div>The table shows the tax rates you pay in each tax band</div>
      {/* <div className="mx-auto flex gap-2 tablet:gap-3">
        <div>
          <div className=" text-right text-sm tablet:text-xl">Income</div>
          <div className="  tablet:text-2.5xl text-xl font-bold text-turquoise-600">
            £30,000
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
            £4,650
          </div>
        </div>
      </div> */}
      <div className="w-full overflow-x-auto ">
        <table className="w-full">
          <thead>
            <tr className="">
              <th className="border-b border-neutral-100  py-4 text-left font-normal text-neutral-400">
                Band
              </th>
              <th className="border-b border-neutral-100 text-right font-normal text-neutral-400">
                Earnings Range
              </th>
              <th className="border-b border-neutral-100 text-right font-normal text-neutral-400">
                Amount Earned in Tax Band
              </th>
              <th className="border-b border-neutral-100 text-right font-normal text-neutral-400">
                Tax Rate
              </th>
              <th className="border-b border-neutral-100 text-right font-normal text-neutral-400">
                Tax Amount
              </th>
            </tr>
          </thead>
          <tbody>{displayRows()}</tbody>
        </table>
      </div>
      <div className="mx-auto flex flex-col items-center gap-2">
        <div className=" text-sm font-bold">Income Tax</div>
        <div className=" text-xl font-bold text-orange-400">£4,650</div>
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
