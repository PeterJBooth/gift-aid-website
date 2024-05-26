import { Header } from "../components/Header";

import { CalculatorContextProvider } from "../context/CalculatorContext";
import { FormSection } from "../components/FormSection";
import { Footer } from "../components/Footer";
import { ScreenTypeContextProvider } from "../context/ScreenTypeContext";
import { PopupContextProvider } from "../context/PopupContext";
import { BackgroundShapes } from "../components/BackgroundShapes";
import { BreakdownSection } from "../components/breakdownSection/BreakdownSection";
import { BreakdownContextProvider } from "../context/BreakdownContext";

const MainPage = () => {
  return (
    <>
      <ScreenTypeContextProvider>
        <PopupContextProvider>
          <Header giftAidButtonActive={true} />
          <main>
            <BackgroundShapes />
            <BreakdownContextProvider>
              <CalculatorContextProvider>
                <FormSection />
                <BreakdownSection />
              </CalculatorContextProvider>
            </BreakdownContextProvider>
          </main>
          <Footer />
        </PopupContextProvider>
      </ScreenTypeContextProvider>
    </>
  );
};

export { MainPage };
