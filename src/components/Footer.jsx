import { useNavigate } from "react-router-dom";
import logoSmall from "../assets/logo-small.svg";
import { useScreenTypeContext } from "../context/ScreenTypeContext";

const Footer = () => {
  const navigate = useNavigate();

  const { screenType } = useScreenTypeContext();

  const handleClick = () => {
    navigate("/");
  };

  const displayFooterInformation = () => {
    if (!screenType.isMobile) {
      return (
        <>
          <div className="brand-and-copyright">
            <div
              className="brand-logo-and-title small"
              onClick={() => {
                handleClick();
              }}
            >
              <img src={logoSmall} alt="logo icon" />
              <div className="brand-name small">VerifyMyGiftAid</div>
            </div>
            <div className="caption">Copyright © 2024 VeryifyMyGiftAid</div>
          </div>
          <div className="caption">United Kingdom</div>
        </>
      );
    } else {
      return (
        <div className="brand-and-copyright">
          <div
            className="brand-logo-and-title small"
            onClick={() => {
              handleClick();
            }}
          >
            <img src={logoSmall} alt="logo icon" />
            <div className="brand-name small">VerifyMyGiftAid</div>
          </div>
          <div className="copyright">
            <div className="caption">Copyright © 2024 VeryifyMyGiftAid</div>
            <div className="caption">United Kingdom</div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="footer-container">
      <hr className="linebreak" />
      <div className="footer-information">{displayFooterInformation()}</div>
    </div>
  );
};

export { Footer };

{
  /* <div className="footer-container">
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
</div> */
}
