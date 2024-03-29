import logoIcon from "../assets/logo-medium.svg";

const Header = () => {
  return (
    <header>
      <div className="brand-logo-and-title">
        <img src={logoIcon} alt="logo icon" />
        <div className="brand-name">VerifyMyGiftAid</div>
      </div>
      <button className="what-is-gift-aid-button">
        <div className="what-is-gift-aid-text">What is Gift Aid</div>
      </button>
    </header>
  );
};

export { Header };
