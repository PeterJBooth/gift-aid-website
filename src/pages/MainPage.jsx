import { Header } from "../components/Header";

import backgroundShape from "../assets/background-shape.svg";
import backgroundShape2 from "../assets/background-shape2.svg";
import { CalculatorContextProvider } from "../context/CalculatorContext";
import { FormSection } from "../components/FormSection";
import { Footer } from "../components/Footer";

const MainPage = () => {
  return (
    <>
      <img src={backgroundShape} alt="" className="background-shape" />
      <div className="background-shape-container">
        <img src={backgroundShape2} alt="" className="background-shape2" />
      </div>
      <div className="main-page-content">
        <Header />

        <main>
          <CalculatorContextProvider>
            {/* <div className="layout-grid">
            <div className="layout-column"></div>
            <div className="layout-column"></div>
            <div className="layout-column"></div>
            <div className="layout-column"></div>
            <div className="layout-column"></div>
            <div className="layout-column"></div>
            <div className="layout-column"></div>
            <div className="layout-column"></div>
            <div className="layout-column"></div>
            <div className="layout-column"></div>
            <div className="layout-column"></div>
            <div className="layout-column"></div>
          </div> */}
            <FormSection />
          </CalculatorContextProvider>
        </main>

        <Footer />
      </div>
    </>
  );
};

export { MainPage };
