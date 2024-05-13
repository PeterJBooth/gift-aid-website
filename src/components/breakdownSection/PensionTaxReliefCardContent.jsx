import arrowIcon from "../../assets/arrow.svg";
import largeArrowIcon from "../../assets/large-arrow.svg";
import { animated } from "@react-spring/web";
import { UseCalculatorContext } from "../../context/CalculatorContext";
import { addCommasToNumber } from "../../utils/formatNumber";
import { useScreenTypeContext } from "../../context/ScreenTypeContext";

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
                £
                {addCommasToNumber(
                  eligibilityInformation.convertedPensionContribution,
                )}
              </div>

              {eligibilityInformation.pensionFormat === "percentage" && (
                <div className="text-right text-xs2 text-turquoise-600">
                  &#40;
                  {addCommasToNumber(
                    eligibilityInformation.pensionContribution,
                  )}
                  % of Income&#41;
                </div>
              )}
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
                £
                {addCommasToNumber(
                  eligibilityInformation.pensionTaxReliefAmount,
                )}
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
                  <div className=" flex h-[22%] w-full items-center justify-center rounded-t-md bg-orange-500 text-center font-bold leading-5 text-neutral-25 opacity-90">
                    Tax Relief <br />£
                    {addCommasToNumber(
                      eligibilityInformation.pensionTaxReliefAmount,
                    )}
                  </div>

                  <div className=" flex h-[78%] w-full items-center justify-center  rounded-b-md bg-turquoise-600  text-center font-bold leading-5 text-neutral-25 opacity-90">
                    Contribution <br /> £{" "}
                    {addCommasToNumber(
                      eligibilityInformation.convertedPensionContribution,
                    )}
                  </div>
                </div>
                <div className=" text-center text-sm text-neutral-400 ">
                  Basic rate taxpayer
                </div>
              </div>

              <div className="flex w-full flex-col gap-4 tablet:w-96 ">
                <div className=" text-base font-bold ">Tax Relief</div>
                <div className="flex flex-col gap-6">
                  <div className="leading-6">
                    As a basic rate taxpayer, if you invest <b>£80</b> in a
                    pension, your pension will receive an additional <b>£20</b>{" "}
                    from the government in the form of tax relief.
                  </div>
                  <div className="leading-6">
                    For a contribution of{" "}
                    <span className=" font-bold text-turquoise-600">
                      £
                      {addCommasToNumber(
                        eligibilityInformation.convertedPensionContribution,
                      )}{" "}
                    </span>
                    to your pension, tax relief will amount to{" "}
                    <span className="font-bold text-orange-400">
                      £
                      {addCommasToNumber(
                        eligibilityInformation.pensionTaxReliefAmount,
                      )}
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
                £
                {addCommasToNumber(
                  eligibilityInformation.pensionTaxReliefAmount,
                )}
              </div>
            </div>
          </animated.div>
        </animated.div>
      </animated.div>
    </div>
  );
};

export { PensionTaxReliefCardContent };
