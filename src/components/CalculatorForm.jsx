import { CheckboxInput } from "../components/CheckboxInput";
import { UseCalculatorContext } from "../context/CalculatorContext";
import { CalculateButton } from "./CalculateButton";
import { AdvancedOptionsSection } from "./AdvancedOptionsSection";
import { PensionSection } from "./PensionSection";
import { SelectInputSection } from "./SelectInputSection";

const CalculatorForm = () => {
  const { setLivesScotland } = UseCalculatorContext();

  return (
    <div className="calculator-form">
      <p className="form-title">Gift Aid Calculator</p>
      <SelectInputSection />
      <CheckboxInput
        title="I Live In Scotland"
        setState={setLivesScotland}
        zIndex={3}
      />
      <PensionSection />
      <div className="line-break-container">
        <hr />
      </div>

      <AdvancedOptionsSection />
      <CalculateButton />
    </div>
  );
};

export { CalculatorForm };
