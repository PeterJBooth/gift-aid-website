import { useTransition } from "@react-spring/web";
import { UseCalculatorContext } from "../context/CalculatorContext";
import { CheckboxInput } from "./CheckboxInput";
import { ToggleInput } from "./ToggleInput";

const PensionSection = () => {
  const {
    contributesToPension,
    setContributesToPension,
    pensionAmount,
    setPensionAmount,
  } = UseCalculatorContext();

  const componentTransition = useTransition(contributesToPension, {
    from: { opacity: 0, y: -88, maxHeight: 0, paddingTop: 0, paddingBottom: 0 },
    enter: {
      opacity: 1,
      y: 0,
      maxHeight: 88,
      paddingTop: 16,
      paddingBottom: 8,
    },
    leave: {
      opacity: 0,
      y: -88,
      maxHeight: 0,
      paddingTop: 0,
      paddingBottom: 0,
    },
  });

  return (
    <>
      <CheckboxInput
        title="I Contribute To a Pension"
        setState={setContributesToPension}
        zIndex={3}
      />
      {componentTransition((style, item) =>
        item === true ? (
          <ToggleInput
            id="pensionInput"
            setInputValue={setPensionAmount}
            inputValue={pensionAmount}
            style={style}
          />
        ) : (
          ""
        )
      )}
    </>
  );
};

export { PensionSection };
