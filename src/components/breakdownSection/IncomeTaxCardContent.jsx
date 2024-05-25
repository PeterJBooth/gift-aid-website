import arrowIcon from "../../assets/arrow.svg";
import largeArrowIcon from "../../assets/large-arrow.svg";
import { animated } from "@react-spring/web";
import { MoreInfoProvider } from "../calculatorForm/MoreInfoProvider";
import { UseCalculatorContext } from "../../context/CalculatorContext";
import { addCommasToNumber, formatNumber } from "../../utils/formatNumber";
import { useScreenTypeContext } from "../../context/ScreenTypeContext";
import { basicPersonalAllowance } from "../../calculate";

const IncomeTaxCardContent = ({
  mainProps,
  expandedSectionRef,
  expandedSectionProps,
  insideProps,
  summaryInfoRef,
  summaryInfoProps,
}) => {
  const { eligibilityInformation } = UseCalculatorContext();
  const { screenType } = useScreenTypeContext();

  const { grossIncome, incomeTaxTable, incomeTaxAmount } =
    eligibilityInformation;

  const determineReductionInPersonalAllowance = () => {
    if (grossIncome < 100000) {
      return 0;
    }

    return Math.min(basicPersonalAllowance, (grossIncome - 100000) * 2);
  };

  const displayRows = () => {
    if (incomeTaxTable == null) return;

    return incomeTaxTable.map((taxBand) => {
      return (
        <tr key={taxBand.name}>
          <td className="sticky left-0 border-b border-neutral-100  bg-white py-10 pr-4 leading-6">
            {taxBand.displayName}
          </td>
          <td className=" justify-end  border-b border-neutral-100 px-4 py-10 text-right leading-6">
            <div className="flex justify-end whitespace-nowrap">
              {taxBand.upperLimit != null || taxBand.upperLimit === 0
                ? "£" +
                  addCommasToNumber(taxBand.lowerLimit) +
                  " - £" +
                  addCommasToNumber(taxBand.upperLimit)
                : "Over £" + addCommasToNumber(taxBand.lowerLimit)}
              {taxBand.displayName === "Personal Allowance" &&
              grossIncome > 100000 &&
              screenType.isMobile !== true ? (
                <MoreInfoProvider
                  title={"Personal Allowance Reduction"}
                  content={`Your personal allowance of £${addCommasToNumber(basicPersonalAllowance)} goes down by £1 for every £2 that your gross income is above £100,000.
                    
                    Your gross income is £${addCommasToNumber(grossIncome)}. Therefore, your personal allowance has been reduced by £${addCommasToNumber(determineReductionInPersonalAllowance())}, and as result is £${addCommasToNumber(taxBand.upperLimit)}.`}
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
                £{addCommasToNumber(grossIncome)}
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
                £{addCommasToNumber(incomeTaxAmount)}
              </div>
            </div>
          </animated.div>
          <animated.div style={{ ...expandedSectionProps }}>
            <div className=" flex w-full flex-col gap-8 ">
              <div>The table shows the tax rates you pay in each tax band</div>
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
                            £{addCommasToNumber(incomeTaxAmount)}
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
                £{addCommasToNumber(incomeTaxAmount)}
              </div>
            </div>
          </animated.div>
        </animated.div>
      </animated.div>
    </div>
  );
};

export { IncomeTaxCardContent };

// Income Year
// Pension Percentage
// Donation Year

// Everything is in year units, don't have to worry about converting anywhere

// Income Year
// Pension Monthly
// Donation Year

// pension Conversion needs happen at the very beggining

// Income Year
// Pension Percentage
// Donation Month

// donation conversion at the end

// Income Year
// Pension Month
// Donation Month

// pension Conversion needs happen at the very beggining
// donation conversion at the end

// Income Year
// Donation Month
