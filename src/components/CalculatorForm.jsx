import { ToggleInput } from "./ToggleInput";
import { CheckboxInput } from "../components/CheckboxInput";
import { SelectInput } from "../components/SelectInput";
import toogleIcon from "../assets/toggle.svg";
import { UseCalculatorContext } from "../context/CalculatorContext";
import { useTransition, animated } from "@react-spring/web";

const CalculatorForm = () => {
  const {
    setSelectedIncomeInterval,
    setIncome,
    setSelectedDonationInterval,
    setDonationAmount,
    setLivesScotland,
    setContributesToPension,
    contributesToPension,
    pensionAmount,
    setPensionAmount,
    setUsingAdvancedOptions,
    usingAdvancedOptions,
    setHigherRateGiftAidRelief,
    setHigherRatePensionRelief,
  } = UseCalculatorContext();

  // console.log(UseCalculatorContext());
  // console.log(setLivesScotland);

  const advancedOptionsTransition = useTransition(usingAdvancedOptions, {
    from: { opacity: 0, y: -151, maxHeight: 0 },
    enter: { opacity: 1, y: 0, maxHeight: 151 },
    leave: { opacity: 0, y: -151, maxHeight: 0 },
  });

  return (
    <div className="calculator-form">
      <p className="form-title">Gift Aid Calculator</p>
      <SelectInput
        inputTitle="Income *"
        setSelectValue={setSelectedIncomeInterval}
        setInputValue={setIncome}
        id="incomeInput"
      />
      <SelectInput
        inputTitle="Amount I want to Donate *"
        setSelectValue={setSelectedDonationInterval}
        setInputValue={setDonationAmount}
        id="donationInput"
      />
      <CheckboxInput
        title="I Live In Scotland"
        setState={setLivesScotland}
        zIndex={3}
      />
      <CheckboxInput
        title="I Contribute To a Pension"
        setState={setContributesToPension}
        zIndex={3}
      />
      <ToggleInput
        id="pensionInput"
        setInputValue={setPensionAmount}
        inputValue={pensionAmount}
      />
      <div className="line-break-container">
        <hr />
      </div>
      <CheckboxInput
        title="Use Advanced Options"
        setState={setUsingAdvancedOptions}
      />
      {advancedOptionsTransition((style, item) =>
        item === true ? (
          <animated.div style={style}>
            <CheckboxInput
              title="I Claim Higher Rate Tax Relief On Gift Aid Donations"
              setState={setHigherRateGiftAidRelief}
            />
            <CheckboxInput
              title="I Claim Higher Rate Tax Relief On Pension Contri-butions"
              setState={setHigherRatePensionRelief}
            />
          </animated.div>
        ) : (
          ""
        )
      )}
      <button className="calculate-button">Calculate</button>
    </div>
  );
};

export { CalculatorForm };
