import { IncomeTaxCard } from "./IncomeTaxCard";
import { useBreakdownContext } from "../../context/BreakdownContext";
import { PensionTaxReliefCard } from "./PensionTaxReliefCard";

const BreakdownSection = () => {
  const { breakdownSectionRef, isVisible } = useBreakdownContext();
  // console.log(useBreakdownContext());

  return (
    <div ref={breakdownSectionRef}>
      {isVisible && (
        <div className="mx-auto flex max-w-10xl flex-col gap-20 px-2 pb-40 pt-40 tablet:px-custom ">
          <IncomeTaxCard />
          <PensionTaxReliefCard />

          <IncomeTaxCard />
          <IncomeTaxCard />
          <IncomeTaxCard />
        </div>
      )}
    </div>
  );
};

export { BreakdownSection };
