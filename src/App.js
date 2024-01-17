import "./global.css";
import "./App.css";
import logoIcon from "./assets/logo-medium.svg";
import toogleIcon from "./assets/toggle.svg";

function App() {
  return (
    <>
      <header>
        <div className="header-title">
          <img src={logoIcon} alt="logo icon" />
          <div className="title">VerifyMyGiftAid</div>
        </div>
        <button className="what-is-gift-aid-button">
          <div className="what-is-gift-aid-text">What is Gift Aid</div>
        </button>
      </header>
      <main>
        <div className="calculator-form">
          <p className="form-title">Gift Aid Calculator</p>
          <div className="select-input-container">
            <p className="input-title">Income</p>
            <div className="select-input">
              <div className="single-select">
                <div className="select-value">Month</div>
                <img src={toogleIcon} alt="toggle" />
              </div>
              <input type="number" className="text-input"></input>
            </div>
          </div>
          <div className="select-input-container">
            <p className="input-title">Amount I Want to Donate</p>
            <div className="select-input">
              <div className="single-select">
                <div className="select-value">Month</div>
                <img src={toogleIcon} alt="toggle" />
              </div>
              <input type="number" className="text-input"></input>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
