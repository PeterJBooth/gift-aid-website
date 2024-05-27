import { CheckboxInput } from "./CheckboxInput";
import { UseCalculatorContext } from "../../context/CalculatorContext";
import { CalculateButton } from "./CalculateButton";
import { AdvancedOptionsSection } from "./AdvancedOptionsSection";
import { PensionSection } from "./PensionSection";
import { SelectInputSection } from "./SelectInputSection";

const CalculatorForm = () => {
  const { setLivesInScotland, livesInScotland } = UseCalculatorContext();

  return (
    <section aria-labelledby="calculator-title" className=" ml-1">
      <h2
        id="calculator-title"
        className="form-title ml-[-0.1rem]  text-3xl font-bold tracking-[-0.04rem]	"
      >
        Gift Aid Calculator
      </h2>
      <form className="flex max-w-80 flex-col" action="">
        <SelectInputSection />
        <CheckboxInput
          title="I Live In Scotland"
          setCheckboxState={setLivesInScotland}
          checkboxState={livesInScotland}
          zIndex={50}
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
      </form>
    </section>
  );
};

export { CalculatorForm };
