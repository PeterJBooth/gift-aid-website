import { useEffect } from "react";
import { UseCalculatorContext } from "../../context/CalculatorContext";
import { CheckboxInput } from "./CheckboxInput";
import { useTransition, animated } from "@react-spring/web";

const AdvancedOptionsSection = () => {
  const {
    setUsingAdvancedOptions,
    setClaimsAdditionalGiftAidRelief,
    claimsAdditionalGiftAidRelief,
    setClaimsAdditionalPensionRelief,
    claimsAdditionalPensionRelief,
    usingAdvancedOptions,
  } = UseCalculatorContext();

  const advancedOptionsTransition = useTransition(usingAdvancedOptions, {
    from: { opacity: 0, y: -176, maxHeight: 0 },
    enter: { opacity: 1, y: 0, maxHeight: 176 },
    leave: { opacity: 0, y: -176, maxHeight: 0 },
  });

  useEffect(() => {
    const uncheckHiddenCheckboxes = () => {
      setClaimsAdditionalGiftAidRelief(false);
      setClaimsAdditionalPensionRelief(false);
    };

    if (
      !usingAdvancedOptions &&
      (claimsAdditionalGiftAidRelief || claimsAdditionalPensionRelief)
    ) {
      uncheckHiddenCheckboxes();
    }
  }, [usingAdvancedOptions]);

  return (
    <>
      <CheckboxInput
        title="Use Advanced Options"
        setCheckboxState={setUsingAdvancedOptions}
        checkboxState={usingAdvancedOptions}
        informationBox={{
          title: "Advanced Options",
          content:
            "The following advanced options are only applicable for intermediate, higher or additional-rate taxpayer, who claim the below forms of tax relief.",
        }}
      />
      {advancedOptionsTransition((style, item) =>
        item === true ? (
          <animated.div style={style}>
            <CheckboxInput
              title="I Claim Additional Tax Relief On Gift Aid Donations"
              setCheckboxState={setClaimsAdditionalGiftAidRelief}
              checkboxState={claimsAdditionalGiftAidRelief}
            />
            <CheckboxInput
              title="I Claim Additional Tax Relief On Pension Contributions"
              setCheckboxState={setClaimsAdditionalPensionRelief}
              checkboxState={claimsAdditionalPensionRelief}
            />
          </animated.div>
        ) : (
          ""
        ),
      )}
    </>
  );
};

export { AdvancedOptionsSection };
