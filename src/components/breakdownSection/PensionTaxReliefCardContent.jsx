import arrowIcon from "../../assets/arrow.svg";
import largeArrowIcon from "../../assets/large-arrow.svg";
import { animated } from "@react-spring/web";
import { UseCalculatorContext } from "../../context/CalculatorContext";
import { addCommasToNumber } from "../../utils/formatNumber";
import { useScreenTypeContext } from "../../context/ScreenTypeContext";
import { capitaliseFirstLetter } from "../../utils/capitalise";

const PensionTaxReliefCardContent = ({
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
    convertedPensionContribution,
    pensionFormat,
    pensionContribution,
    pensionTaxReliefAmount,
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
            className="mx-auto flex gap-2 pt-8 tablet:gap-3"
            ref={summaryInfoRef}
            style={{ ...summaryInfoProps }}
          >
            <div className=" flex flex-col gap-1 tablet:gap-2">
              <div className="text-right  text-sm tablet:text-xl">
                Yearly Pension <br />
                Contribution
              </div>
              <div className="text-right text-xl font-bold text-turquoise-600 tablet:text-2.5xl">
                £{addCommasToNumber(convertedPensionContribution)}
              </div>
              <div className="text-right text-xs2 text-turquoise-600">
                &#40;
                {pensionFormat === "percentage"
                  ? `${addCommasToNumber(pensionContribution)}% of Income`
                  : `or £${addCommasToNumber(pensionContribution)}/month`}
                &#41;
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
                Pension Tax <br /> Relief
              </div>
              <div className=" text-xl font-bold text-neutral-900 tablet:text-2.5xl">
                £{addCommasToNumber(pensionTaxReliefAmount)}
              </div>
            </div>
          </animated.div>
          <animated.div
            style={expandedSectionProps}
            className="flex flex-col gap-12"
          >
            <div className="flex w-full flex-col-reverse justify-center gap-12 largePhone:px-12  tablet:flex-row tablet:gap-32">
              <div className="flex flex-col items-center gap-4">
                <div className=" h-80 w-36 rounded-md  shadow-lg largePhone:h-[22rem] largePhone:w-40">
                  <div
                    className={`flex h-[${claimsAdditionalPensionTaxRelief ? Math.max(Math.floor(taxBand.taxRate / 5) * 5, 20) : 20}%] opacity-90œ w-full items-center justify-center rounded-t-md bg-orange-500 text-center font-bold leading-5 text-neutral-25`}
                  >
                    Tax Relief <br />£
                    {addCommasToNumber(pensionTaxReliefAmount)}
                  </div>

                  <div
                    className={` flex h-[${claimsAdditionalPensionTaxRelief ? Math.min(Math.ceil((100 - taxBand.taxRate) / 5) * 5, 80) : 80}%]  w-full items-center justify-center  rounded-b-md bg-turquoise-600  text-center font-bold leading-5 text-neutral-25 opacity-90`}
                  >
                    Contribution
                    <br /> £ {addCommasToNumber(convertedPensionContribution)}
                  </div>
                </div>
                <div className=" w-44 text-center text-xs2 leading-5 text-neutral-400  ">
                  {displayPensionReliefEligibilityStatus(true)}
                </div>
              </div>

              <div className="flex w-full flex-col gap-4 tablet:w-96 ">
                <div className=" text-base font-bold ">Tax Relief</div>
                <div className="flex flex-col gap-6">
                  <div className="leading-6">
                    As a {displayPensionReliefEligibilityStatus()}, if you
                    invest{" "}
                    <b>
                      £
                      {claimsAdditionalPensionTaxRelief
                        ? Math.min(100 - taxBand.taxRate, 80)
                        : 80}
                    </b>{" "}
                    in a pension, your pension will receive an additional{" "}
                    <b>
                      £
                      {claimsAdditionalPensionTaxRelief
                        ? Math.max(taxBand.taxRate, 20)
                        : 20}
                    </b>{" "}
                    from the government in the form of tax relief.
                  </div>
                  <div className="leading-6">
                    For a contribution of{" "}
                    <span className=" font-bold text-turquoise-600">
                      £{addCommasToNumber(convertedPensionContribution)}{" "}
                    </span>
                    to your pension, tax relief will amount to{" "}
                    <span className="font-bold text-orange-400">
                      £{addCommasToNumber(pensionTaxReliefAmount)}
                    </span>
                    .
                  </div>
                </div>
              </div>
            </div>
            <div className="mx-auto flex flex-col items-center gap-2">
              <div className=" text-sm font-bold tablet:text-xl ">
                Pension Tax Relief
              </div>
              <div className=" text-xl font-bold text-orange-400 tablet:text-2.5xl">
                £{addCommasToNumber(pensionTaxReliefAmount)}
              </div>
            </div>
          </animated.div>
        </animated.div>
      </animated.div>
    </div>
  );
};

export { PensionTaxReliefCardContent };
//Math.min(basicPersonalAllowance, (grossIncome - 100000) * 2)
