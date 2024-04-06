import tickIcon from "../assets/tick-icon.svg";
import openHandIcon from "../assets/hand-open-icon.svg";
import circleIcon from "../assets/circle.svg";
import underline from "../assets/underline1.svg";
import "../calculator-form.css";

const PageTitle = () => {
  return (
    <div className="page-title-container">
      <img src={tickIcon} alt="Tick Icon" className="tick-icon" />
      <div className="page-title">
        <span className="title-line1">Check Your Eligibility</span>
        <span>for Gift Aid Donations</span>
        <img src={underline} alt="underline" className="underline" />
      </div>
      <div className="open-hand-icon-container">
        <div className="open-hand-icon">
          <img src={circleIcon} alt="circle" className="circle" />
          <div className="pound-sign">£</div>
          <img src={openHandIcon} alt="Open Hand Icon" className="open-hand" />
        </div>
      </div>
    </div>
  );
};

export { PageTitle };
