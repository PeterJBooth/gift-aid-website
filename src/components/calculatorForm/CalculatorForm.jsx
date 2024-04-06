import { CheckboxInput } from "./CheckboxInput";
import { UseCalculatorContext } from "../../context/CalculatorContext";
import { CalculateButton } from "./CalculateButton";
import { AdvancedOptionsSection } from "./AdvancedOptionsSection";
import { PensionSection } from "./PensionSection";
import { SelectInputSection } from "./SelectInputSection";

const CalculatorForm = () => {
  const { setLivesInScotland, livesInScotland } = UseCalculatorContext();

  return (
    <div className="calculator-form">
      <p className="form-title">Gift Aid Calculator</p>
      <SelectInputSection />
      <CheckboxInput
        title="I Live In Scotland"
        setCheckboxState={setLivesInScotland}
        checkboxState={livesInScotland}
        zIndex={5}
        informationBox={{
          title: "Scottish Tax Impact",
          content:
            "The Scottish Government has its own tax bands for those living in Scotland, so the amount of income tax you pay is calculated differently.",
        }}
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
