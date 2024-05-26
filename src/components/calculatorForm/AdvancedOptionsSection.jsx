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
    from: { opacity: 0, y: -144, maxHeight: 0 },
    enter: { opacity: 1, y: 0, maxHeight: 144 },
    leave: { opacity: 0, y: -144, maxHeight: 0 },
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
            "The following advanced options are only applicable for intermediate, higher or additional-rate taxpayers, who claim the forms of tax relief shown below.",
        }}
      />
      {advancedOptionsTransition((style, item) =>
        item === true ? (
          <animated.div style={style}>
            <CheckboxInput
              title="I Claim Additional Tax Relief On Pension Contributions"
              setCheckboxState={setClaimsAdditionalPensionRelief}
              checkboxState={claimsAdditionalPensionRelief}
            />
            <CheckboxInput
              title="I Claim Additional Tax Relief On Gift Aid Donations"
              setCheckboxState={setClaimsAdditionalGiftAidRelief}
              checkboxState={claimsAdditionalGiftAidRelief}
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
