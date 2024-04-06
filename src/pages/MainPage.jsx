import { Header } from "../components/Header";

import { CalculatorContextProvider } from "../context/CalculatorContext";
import { FormSection } from "../components/FormSection";
import { Footer } from "../components/Footer";
import { ScreenTypeContextProvider } from "../context/ScreenTypeContext";
import { PopupContextProvider } from "../context/PopupContext";
import { GiftAidButton } from "../components/GiftAidButton";
import { Menu } from "../components/Menu";
import { BackgroundShapes } from "../components/BackgroundShapes";

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
            </CalculatorContextProvider>
          </main>
          <Footer />
        </PopupContextProvider>
      </ScreenTypeContextProvider>
    </>
  );
};

export { MainPage };
