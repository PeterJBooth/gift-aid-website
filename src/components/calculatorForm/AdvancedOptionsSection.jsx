import { useEffect, useRef } from "react";
import { UseCalculatorContext } from "../../context/CalculatorContext";
import { CheckboxInput } from "./CheckboxInput";
import { animated, useSpring } from "@react-spring/web";

const AdvancedOptionsSection = () => {
  const {
    setUsingAdvancedOptions,
    setClaimsAdditionalGiftAidRelief,
    claimsAdditionalGiftAidRelief,
    setClaimsAdditionalPensionRelief,
    claimsAdditionalPensionRelief,
    usingAdvancedOptions,
  } = UseCalculatorContext();

  const [props, api] = useSpring(() => ({ height: 0 }), []);
  const usingAdvancedOptionPreviousState = useRef(false);
  const advancedOptionsRef = useRef(null);

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

    if (usingAdvancedOptionPreviousState.current !== usingAdvancedOptions) {
      usingAdvancedOptionPreviousState.current = usingAdvancedOptions;

      api.start({
        from: {
          height: usingAdvancedOptions
            ? 0
            : advancedOptionsRef.current.offsetHeight,
          opacity: usingAdvancedOptions ? 0 : 1,
        },
        to: {
          height: usingAdvancedOptions
            ? advancedOptionsRef.current.offsetHeight
            : 0,
          opacity: usingAdvancedOptions ? 1 : 0,
        },
      });
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

      <animated.div style={props} className="relative overflow-hidden">
        <div
          className="absolute bottom-0 left-0 right-0"
          ref={advancedOptionsRef}
        >
          <CheckboxInput
            title="I Claim Additional Tax Relief On Pension Contributions"
            setCheckboxState={setClaimsAdditionalPensionRelief}
            checkboxState={claimsAdditionalPensionRelief}
            isTransparent={true}
          />
          <CheckboxInput
            title="I Claim Additional Tax Relief On Gift Aid Donations"
            setCheckboxState={setClaimsAdditionalGiftAidRelief}
            checkboxState={claimsAdditionalGiftAidRelief}
            isTransparent={true}
          />
        </div>
      </animated.div>
    </>
  );
};

export { AdvancedOptionsSection };
