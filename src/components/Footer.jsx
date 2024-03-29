import logoSmall from "../assets/logo-small.svg";

const Footer = () => {
  return (
    <div className="footer-container">
      <hr className="linebreak" />
      <div className="footer-information">
        <div className="brand-and-copyright">
          <div className="brand-logo-and-title">
            <img src={logoSmall} alt="logo icon" />
            <div className="brand-name small">VerifyMyGiftAid</div>
          </div>
          <div className="caption">Copyright © 2024 VeryifyMyGiftAid</div>
        </div>
        <div className="caption">United Kingdom</div>
      </div>
    </div>
  );
};

export { Footer };
