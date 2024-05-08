import { Header } from "../components/Header";

import { CalculatorContextProvider } from "../context/CalculatorContext";
import { FormSection } from "../components/FormSection";
import { Footer } from "../components/Footer";
import { ScreenTypeContextProvider } from "../context/ScreenTypeContext";
import { PopupContextProvider } from "../context/PopupContext";
import { BackgroundShapes } from "../components/BackgroundShapes";
import { IncomeTaxCard } from "../components/breakdownSection/IncomeTaxCard";
import { BreakdownSection } from "../components/breakdownSection/BreakdownSection";

const MainPage = () => {
  return (
    <>
      <ScreenTypeContextProvider>
        <PopupContextProvider>
          <Header giftAidButtonActive={true} />
          <main>
            <BackgroundShapes />
            <CalculatorContextProvider>
              <FormSection />
              <BreakdownSection />
            </CalculatorContextProvider>
          </main>
          <Footer />
        </PopupContextProvider>
      </ScreenTypeContextProvider>
    </>
  );
};

export { MainPage };
