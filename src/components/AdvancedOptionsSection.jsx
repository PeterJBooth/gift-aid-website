import { UseCalculatorContext } from "../context/CalculatorContext";
import { CheckboxInput } from "../components/CheckboxInput";
import { useTransition, animated } from "@react-spring/web";

const AdvancedOptionsSection = () => {
  const {
    setUsingAdvancedOptions,
    setClaimsAdditionalGiftAidRelief,
    setClaimsAdditionalPensionRelief,
    usingAdvancedOptions,
  } = UseCalculatorContext();

  const advancedOptionsTransition = useTransition(usingAdvancedOptions, {
    from: { opacity: 0, y: -151, maxHeight: 0 },
    enter: { opacity: 1, y: 0, maxHeight: 151 },
    leave: { opacity: 0, y: -151, maxHeight: 0 },
  });

  return (
    <>
      <CheckboxInput
        title="Use Advanced Options"
        setState={setUsingAdvancedOptions}
      />
      {advancedOptionsTransition((style, item) =>
        item === true ? (
          <animated.div style={style}>
            <CheckboxInput
              title="I Claim Additional Tax Relief On Gift Aid Donations"
              setState={setClaimsAdditionalGiftAidRelief}
            />
            <CheckboxInput
              title="I Claim Additional Tax Relief On Pension Contributions"
              setState={setClaimsAdditionalPensionRelief}
            />
          </animated.div>
        ) : (
          ""
        )
      )}
    </>
  );
};

export { AdvancedOptionsSection };
