import { ToggleInput } from "./ToggleInput";
import { CheckboxInput } from "../components/CheckboxInput";
import { SelectInput } from "../components/SelectInput";
import toogleIcon from "../assets/toggle.svg";
import { UseCalculatorContext } from "../context/CalculatorContext";

const CalculatorForm = () => {
  const {
    setSelectedIncomeInterval,
    setIncome,
    setSelectedDonationInterval,
    setDonationAmount,
    setLivesScotland,
    setContributesToPension,
    contributesToPension,
    setUsingAdvancedOptions,
    usingAdvancedOptions,
    setHigherRateGiftAidRelief,
    setHigherRatePensionRelief,
  } = UseCalculatorContext();

  // console.log(UseCalculatorContext());
  // console.log(setLivesScotland);
  return (
    <div className="calculator-form">
      <p className="form-title">Gift Aid Calculator</p>
      <SelectInput
        inputTitle="Income"
        setSelectValue={setSelectedIncomeInterval}
        setInputValue={setIncome}
        id="select1"
      />
      <SelectInput
        inputTitle="Amount I want to Donate"
        setSelectValue={setSelectedDonationInterval}
        setInputValue={setDonationAmount}
        id="select2"
      />
      <CheckboxInput title="I Live In Scotland" setState={setLivesScotland} />
      <CheckboxInput
        title="I Contribute To a Pension"
        setState={setContributesToPension}
      />
      {contributesToPension === true && <ToggleInput id="select2" />}
      <hr />
      <CheckboxInput
        title="Use Advanced Options"
        setState={setUsingAdvancedOptions}
      />
      {usingAdvancedOptions === true && (
        <>
          <CheckboxInput
            title="I Claim Higher Rate Tax Relief On Gift Aid Donations"
            setState={setHigherRateGiftAidRelief}
          />
          <CheckboxInput
            title="I Claim Higher Rate Tax Relief On Pension Contri-butions"
            setState={setHigherRatePensionRelief}
          />
        </>
      )}
      <button className="calculate-button">Calculate</button>
    </div>
  );
};

export { CalculatorForm };
