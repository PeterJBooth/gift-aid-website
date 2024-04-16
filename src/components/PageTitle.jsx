import tickIcon from "../assets/tick-icon.svg";
import openHandIcon from "../assets/hand-open-icon.svg";
import circleIcon from "../assets/circle.svg";
import underline from "../assets/underline1.svg";
import "../calculator-form.css";

const PageTitle = () => {
  return (
    <div className="page-title-container mt-24 relative">
      <img
        src={tickIcon}
        alt="Tick Icon"
        className="absolute -top-[5.125rem] -left-[1.375rem]"
      />
      <div className="page-title text-[45px] text-center leading-snug tracking-tighter font-black max-w-[25rem] desktop:text-[55px] ">
        <span className="title-line1">Check Your Eligibility</span>
        <span>for Gift Aid Donations</span>
        <img src={underline} alt="underline" className="underline" />
      </div>
      {/* <div className="open-hand-icon-container"> */}
      <div className="absolute right-[-3.7rem] top-[10.5rem] w-20">
        <img src={circleIcon} alt="circle" className="absolute top-0 left-0" />
        <div className="absolute left-[0.77rem] top-[0.35rem] -rotate-[32deg] text-blue-200 text-xl font-black">
          £
        </div>
        <img
          src={openHandIcon}
          alt="Open Hand Icon"
          className="absolute left-[0.8rem] top-[1.2rem]"
        />
      </div>
    </div>
  );
};

export { PageTitle };
