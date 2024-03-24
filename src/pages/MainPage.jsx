import { Header } from "../components/Header";

import { CalculatorForm } from "../components/CalculatorForm";
import { PageTitle } from "../components/PageTitle";
import vector1 from "../assets/bg-vector1.svg";
import vector2 from "../assets/bg-vector2.svg";
import { CalculatorContextProvider } from "../context/CalculatorContext";

const MainPage = () => {
  return (
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
          <img src={vector1} alt="" className="vector1" />
          <div className="calculator-and-result-container">
            <CalculatorForm />
            <PageTitle />
          </div>
          <img src={vector2} alt="" className="vector2" />
        </CalculatorContextProvider>
      </main>
    </div>
  );
};

export { MainPage };
