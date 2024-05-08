import { useRef } from "react";
import { IncomeTaxCard } from "./IncomeTaxCard";
import { usePopupContext } from "../../context/PopupContext";

const BreakdownSection = () => {
  const { breakdownSectionRef } = usePopupContext();

  return (
    <div
      className="mx-auto max-w-10xl gap-12 px-custom pb-40"
      ref={breakdownSectionRef}
    >
      <IncomeTaxCard />
    </div>
  );
};

export { BreakdownSection };
