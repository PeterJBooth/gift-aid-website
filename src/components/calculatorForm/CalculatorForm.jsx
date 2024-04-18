import { CheckboxInput } from "./CheckboxInput";
import { UseCalculatorContext } from "../../context/CalculatorContext";
import { CalculateButton } from "./CalculateButton";
import { AdvancedOptionsSection } from "./AdvancedOptionsSection";
import { PensionSection } from "./PensionSection";
import { SelectInputSection } from "./SelectInputSection";

const CalculatorForm = () => {
  const { setLivesInScotland, livesInScotland } = UseCalculatorContext();

  return (
    <div className="calculator-form ml-1 flex max-w-80 flex-col">
      <p className="form-title ml-[-0.1rem]  text-3xl font-bold tracking-[-0.04rem]	">
        Gift Aid Calculator
      </p>
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
      <div className="z-20 bg-neutral-25 py-4">
        <hr className="h-px border-none bg-neutral-100" />
      </div>

      <AdvancedOptionsSection />
      <CalculateButton />
    </div>
  );
};

export { CalculatorForm };
