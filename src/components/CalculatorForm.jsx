import { ToggleInput } from "./ToggleInput";
import { CheckboxInput } from "../components/CheckboxInput";
import { SelectInput } from "../components/SelectInput";

const CalculatorForm = () => {
  return (
    <div className="calculator-form">
      <p className="form-title">Gift Aid Calculator</p>
      <SelectInput inputTitle="Income" />
      <SelectInput inputTitle="Amount I want to Donate" />
      <CheckboxInput title="I Live In Scotland" />
      <CheckboxInput title="I Contribute To a Pension" />
      {/* <ToggleInput /> */}
      <hr />
      <CheckboxInput title="Use Advanced Options" />
      {/* <CheckboxInput title="I Claim Higher Rate Tax Relief On Gift Aid Donations" />
      <CheckboxInput title="I Claim Higher Rate Tax Relief On Pension Contri-butions" /> */}
      <button className="calculate-button">Calculate</button>
    </div>
  );
};

export { CalculatorForm };
