import { animated } from "@react-spring/web";
import { UseCalculatorContext } from "../../context/CalculatorContext";
import { addCommasToNumber } from "../../utils/formatNumber";
import { useScreenTypeContext } from "../../context/ScreenTypeContext";
import { capitaliseFirstLetter } from "../../utils/capitalise";
import { useState } from "react";
import { ResultMessage } from "../ResultMessage";

const GiftAidEligibilityCardContent = ({
  mainProps,
  expandedSectionRef,
  expandedSectionProps,
  insideProps,
  summaryInfoRef,
  summaryInfoProps,
}) => {
  const { eligibilityInformation } = UseCalculatorContext();
  const { screenType } = useScreenTypeContext();
  const [totalIsHovered, setTotalIsHovered] = useState(false);

  const {
    taxBand,
    claimsAdditionalPensionTaxRelief,
    canClaimGiftAid,
    donationAmount,
    giftAidToClaim,
    giftAidTaxRelief,
    claimsAdditionalGiftAidTaxRelief,
    totalTaxPaid,
    selectedDonationInterval,
  } = eligibilityInformation;

  const getDiagramHeight = {
    17.5: "h-[17.5%]",
    20: "h-[20%]",
    25: "h-[25%]",
    30: "h-[30%]",
    35: "h-[35%]",
    40: "h-[40%]",
    45: "h-[45%]",
    50: "h-[50%]",
    55: "h-[55%]",
    60: "h-[60%]",
    65: "h-[65%]",
    70: "h-[70%]",
    75: "h-[75%]",
    80: "h-[80%]",
  };

  const taxbandsEligibleForAdditionalRelief = [
    "intermediateRate",
    "higherRate",
    "advancedRate",
    "additionalRate",
  ];

  const displayExampleExtraRelief = () => {
    const exampleExtraRelief = 1.25 * (taxBand.taxRate - 20);

    if (Number.isInteger(exampleExtraRelief)) {
      return exampleExtraRelief;
    }

    return exampleExtraRelief.toLocaleString("en", {
      minimumFractionDigits: 2,
    });
  };

  const displayGiftAidReliefEligibilityStatus = (capitalise) => {
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

  const determineGiftAidReliefEligibility = () => {
    const isEligible =
      claimsAdditionalGiftAidTaxRelief &&
      taxbandsEligibleForAdditionalRelief.includes(taxBand.name);
    return isEligible;
  };

  const handleMouseHover = () => {
    setTotalIsHovered(true);
  };

  const handleMouseExit = () => {
    setTotalIsHovered(false);
  };

  const getBlockHeightPercentage = (amount) => {
    if (amount === 0) return 0;

    return Math.max(
      Math.floor(
        (100 * amount) /
          (5 * (donationAmount + giftAidToClaim + giftAidTaxRelief)),
      ) * 5,
      20,
    );
  };

  const displayFinalParagraph = () => {
    return (
      <div className="flex w-full flex-col gap-4 tablet:max-w-96 ">
        <h3 className=" text-base font-bold ">
          Your Tax Paid Determines Gift Aid Potential{" "}
        </h3>
        <div className="flex flex-col gap-6">
          <div className="leading-7">
            {determineGiftAidReliefEligibility() ? (
              <>
                The combined total of the gift aid benefit to the charity and
                your gift aid tax relief (totalling{" "}
                <div
                  className="  relative inline-block cursor-default font-bold"
                  onMouseEnter={() => {
                    handleMouseHover();
                  }}
                  onMouseLeave={() => {
                    handleMouseExit();
                  }}
                >
                  £{addCommasToNumber(giftAidToClaim + giftAidTaxRelief)}
                  <div
                    className={` absolute -bottom-2 left-[50%] -translate-x-[50%]
            translate-y-full whitespace-nowrap
             rounded border border-neutral-50 bg-neutral-25 p-2 shadow transition-opacity before:absolute  before:right-1/2  before:top-0 before:size-4 before:-translate-y-1/2 before:translate-x-1/2 before:rotate-45  before:border-l before:border-t  before:border-neutral-50 before:border-l-neutral-50 before:bg-neutral-25  before:content-[''] ${totalIsHovered ? "opacity-100" : "opacity-0"} `}
                  >
                    <span className=" font-bold text-orange-600">
                      £{addCommasToNumber(giftAidToClaim)}
                    </span>{" "}
                    +{" "}
                    <span className=" font-bold text-blue-300">
                      {" "}
                      £{addCommasToNumber(giftAidTaxRelief)}
                    </span>{" "}
                  </div>
                </div>
                ) cannot exceed the total amount of tax you have paid{" "}
                {selectedDonationInterval === "Month" ? " in a month " : " "}(
                <span className=" font-bold text-turquoise-600">
                  £
                  {addCommasToNumber(
                    totalTaxPaid /
                      (selectedDonationInterval === "Year" ? 1 : 12),
                  )}
                </span>
                {selectedDonationInterval === "Month" ? (
                  <>
                    {" "}
                    or{" "}
                    <span className=" font-bold text-turquoise-600">
                      £{addCommasToNumber(totalTaxPaid)}
                    </span>{" "}
                    ÷ 12
                  </>
                ) : (
                  ""
                )}
                ).
              </>
            ) : (
              <>
                The additional amount that the charity can receive through your
                gift aid donations (
                <span className=" font-bold text-orange-600 ">
                  £{addCommasToNumber(giftAidToClaim)}
                </span>
                ) cannot exceed the total amount of tax you have paid
                {selectedDonationInterval === "Month" ? " in a month " : " "}(
                <span className=" font-bold text-turquoise-600">
                  £
                  {addCommasToNumber(
                    totalTaxPaid /
                      (selectedDonationInterval === "Year" ? 1 : 12),
                  )}
                </span>
                {selectedDonationInterval === "Month" ? (
                  <>
                    {" "}
                    or{" "}
                    <span className=" font-bold text-turquoise-600">
                      £{addCommasToNumber(totalTaxPaid)}
                    </span>{" "}
                    ÷ 12
                  </>
                ) : (
                  ""
                )}
                ).
              </>
            )}
          </div>
          <p className="leading-7">
            As it would{canClaimGiftAid ? " not " : " "}exceeded the total
            amount of tax paid, you {canClaimGiftAid ? " can " : " cannot "}{" "}
            tick the gift aid box.
          </p>
        </div>
      </div>
    );
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
            className="flex w-full gap-2 tablet:gap-3"
            ref={summaryInfoRef}
            style={{ ...summaryInfoProps }}
          >
            <div className="flex w-full flex-col items-start gap-16">
              {determineGiftAidReliefEligibility() ? (
                <p className=" max-w-[32rem] ">
                  The combined total of the gift aid benefit to the charity and
                  your gift aid tax relief would {canClaimGiftAid ? "not" : ""}{" "}
                  exceed the total amount of tax you have paid.
                </p>
              ) : (
                <p className=" max-w-[32rem] leading-6">
                  The additional amount that the charity can receive through
                  your gift aid donations would {canClaimGiftAid ? "not" : ""}{" "}
                  exceed the total amount of tax you have paid.
                </p>
              )}
              <div className="flex w-full justify-center">
                <ResultMessage
                  canClaimGiftAid={canClaimGiftAid}
                  darkText={true}
                />
              </div>
            </div>
          </animated.div>
          <animated.div
            style={expandedSectionProps}
            className="flex flex-col gap-20"
          >
            <div className="flex flex-col gap-12">
              <div className="flex w-full flex-col-reverse items-center justify-center gap-12 tablet:flex-row  tablet:gap-32 tablet:px-4">
                <div className="flex flex-col items-center gap-4">
                  <div className=" h-80 w-36 rounded-md  shadow-lg largePhone:h-[22rem] largePhone:w-40">
                    <div
                      className={` ${getDiagramHeight[getBlockHeightPercentage(giftAidTaxRelief)]} w-full items-center justify-center rounded-t-md bg-blue-300 text-center font-bold leading-5 text-neutral-25 opacity-90 ${determineGiftAidReliefEligibility() ? "flex" : "hidden"}`}
                    >
                      Tax Relief <br />£{addCommasToNumber(giftAidTaxRelief)}
                    </div>
                    <div
                      className={`flex   ${getDiagramHeight[getBlockHeightPercentage(giftAidToClaim)]} w-full items-center justify-center  bg-orange-500 text-center font-bold leading-5 text-neutral-25 opacity-90 ${determineGiftAidReliefEligibility() ? "" : "rounded-t-md"}`}
                    >
                      Gift Aid <br />£{addCommasToNumber(giftAidToClaim)}
                    </div>

                    <div
                      className={` flex ${getDiagramHeight[100 - (getBlockHeightPercentage(giftAidTaxRelief) + getBlockHeightPercentage(giftAidToClaim))]}  w-full items-center justify-center  rounded-b-md bg-blue-600  text-center font-bold leading-5 text-neutral-25 opacity-90`}
                    >
                      Donation
                      <br /> £{addCommasToNumber(donationAmount)}
                    </div>
                  </div>
                  <div className=" w-44 text-center text-xs2 leading-5 text-neutral-400  ">
                    {displayGiftAidReliefEligibilityStatus(true)}
                  </div>
                </div>
                <div className="flex flex-col gap-8">
                  <div className="flex w-full flex-col gap-4 tablet:max-w-96 ">
                    <h3 className=" text-base font-bold ">
                      Understanding Gift Aid Benefit
                    </h3>
                    <div className="flex flex-col gap-6">
                      <p className="leading-7">
                        For a £100 donation, the charity can claim an additional
                        £25 through gift aid, making your donation worth £125 to
                        the charity.
                      </p>
                      {determineGiftAidReliefEligibility() && (
                        <p className="leading-7">
                          As an additional rate tax payer who has claimed
                          additional tax relief on gift aid donations, you would
                          also receive an extra £{displayExampleExtraRelief()}{" "}
                          in tax relief.
                        </p>
                      )}
                      <p className="leading-7">
                        For your donation of{" "}
                        <span className=" font-bold text-blue-700">
                          £{addCommasToNumber(donationAmount)},
                        </span>{" "}
                        the charity can claim an additional{" "}
                        <span className=" font-bold text-orange-600">
                          £{addCommasToNumber(giftAidToClaim)}{" "}
                        </span>{" "}
                        through gift aid
                        {determineGiftAidReliefEligibility() ? (
                          <>
                            , and you would receive{" "}
                            <span className=" font-bold text-blue-400">
                              £{addCommasToNumber(giftAidTaxRelief)}
                            </span>{" "}
                            in tax relief.
                          </>
                        ) : (
                          "."
                        )}
                      </p>
                    </div>
                  </div>
                  {screenType.isMobile ? "" : displayFinalParagraph()}
                </div>
              </div>
              {!screenType.isMobile ? "" : displayFinalParagraph()}
            </div>
            <div className="flex w-full justify-center">
              <ResultMessage
                canClaimGiftAid={canClaimGiftAid}
                darkText={true}
                smallText={true}
              />
            </div>
          </animated.div>
        </animated.div>
      </animated.div>
    </div>
  );
};

export { GiftAidEligibilityCardContent };
