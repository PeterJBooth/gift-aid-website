import arrowIcon from "../../assets/arrow.svg";
import largeArrowIcon from "../../assets/large-arrow.svg";
import { animated } from "@react-spring/web";
import { UseCalculatorContext } from "../../context/CalculatorContext";
import { addCommasToNumber } from "../../utils/formatNumber";
import { useScreenTypeContext } from "../../context/ScreenTypeContext";
import { capitaliseFirstLetter } from "../../utils/capitalise";

const TotalTaxCardContent = ({
  mainProps,
  expandedSectionRef,
  expandedSectionProps,
  insideProps,
  summaryInfoRef,
  summaryInfoProps,
}) => {
  const { eligibilityInformation } = UseCalculatorContext();
  const { screenType } = useScreenTypeContext();

  const {
    taxBand,
    claimsAdditionalPensionTaxRelief,
    grossIncome,
    totalTaxPaid,
    pensionTaxReliefAmount,
    incomeTaxAmount,
  } = eligibilityInformation;

  const diagramHeights =
    "h-[20%] h-[25%] h-[30%] h-[35%] h-[40%] h-[45%] h-[50%] h-[55%] h-[60%] h-[65%] h-[70%] h-[75%] h-[80%]";

  const displayPensionReliefEligibilityStatus = (capitalise) => {
    const taxbandsEligibleForAdditionalRelief = [
      "intermediateRate",
      "higherRate",
      "advancedRate",
      "additionalRate",
    ];

    let defaultStatus = taxBand.displayName.toLowerCase() + " taxpayer";

    if (capitalise) {
      defaultStatus = capitaliseFirstLetter(defaultStatus);
    }

    if (!taxbandsEligibleForAdditionalRelief.includes(taxBand.name)) {
      return defaultStatus;
    }

    if (claimsAdditionalPensionTaxRelief) {
      return defaultStatus + " with additional tax relief";
    }

    if (!claimsAdditionalPensionTaxRelief) {
      return defaultStatus + " without additional tax relief";
    }
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
            className="mx-auto flex gap-2 tablet:gap-3"
            ref={summaryInfoRef}
            style={{ ...summaryInfoProps }}
          >
            <div className="flex flex-col items-center gap-1 tablet:gap-2">
              <div className=" whitespace-nowrap  text-sm tablet:text-xl">
                Total Tax Paid
              </div>
              <div className=" text-xl font-bold text-neutral-900 tablet:text-2.5xl">
                £{addCommasToNumber(totalTaxPaid)}
              </div>
            </div>
          </animated.div>
          <animated.div
            style={expandedSectionProps}
            className="flex flex-col gap-12"
          >
            <div className=" max-w-[480px] leading-6">
              To find out the whether you can claim gift aid, it is necessary to
              determine the total amount of tax you’ll have paid.{" "}
            </div>
            <div className=" mx-auto flex flex-col gap-6 largePhone:flex-row">
              <div className="flex flex-col gap-2 px-3 largePhone:gap-6 largePhone:px-0">
                <div className="text-lg text-neutral-600 largePhone:text-center tablet:text-xl">
                  Income Tax
                </div>
                <div className="text-lg font-bold largePhone:text-center tablet:text-xl">
                  £{addCommasToNumber(incomeTaxAmount)}
                </div>
              </div>
              <hr className="  h-[2px] w-2.5  border-none bg-neutral-700  largePhone:hidden" />

              <div className="hidden flex-col gap-2 largePhone:flex largePhone:gap-6">
                <div className="text-center text-lg text-neutral-600  tablet:text-xl">
                  -
                </div>
                <div className="text-center text-lg font-bold  tablet:text-xl">
                  -
                </div>
              </div>
              <div className=" flex flex-col gap-2 px-3 largePhone:gap-6 largePhone:px-0">
                <div className=" text-lg text-neutral-600 largePhone:text-center tablet:text-xl">
                  Pension Tax Relief
                </div>
                <div className="text-lg font-bold largePhone:text-center tablet:text-xl">
                  £{addCommasToNumber(pensionTaxReliefAmount)}
                </div>
              </div>
              <hr className="h-[2px] border-none  bg-neutral-700 largePhone:hidden" />
              <div className=" hidden flex-col  gap-2 largePhone:flex largePhone:gap-6">
                <div className="text-lg text-neutral-600 largePhone:text-center tablet:text-xl">
                  =
                </div>
                <div className=" text-lg font-bold largePhone:text-center tablet:text-xl">
                  =
                </div>
              </div>
              <div className="flex flex-col gap-2 px-3 largePhone:gap-6 largePhone:px-0">
                <div className="text-lg text-neutral-600 largePhone:text-center tablet:text-xl">
                  Total Tax Paid
                </div>
                <div className="text-lg font-bold text-orange-500 largePhone:text-center tablet:text-xl">
                  £{addCommasToNumber(totalTaxPaid)}
                </div>
              </div>
            </div>
            <div className="mx-auto flex flex-col items-center gap-2">
              <div className=" text-sm font-bold tablet:text-xl ">
                Total Tax Paid
              </div>
              <div className=" text-xl font-bold text-orange-400 tablet:text-2.5xl">
                £{addCommasToNumber(totalTaxPaid)}
              </div>
            </div>
          </animated.div>
        </animated.div>
      </animated.div>
    </div>
  );
};

export { TotalTaxCardContent };
//Math.min(basicPersonalAllowance, (grossIncome - 100000) * 2)
