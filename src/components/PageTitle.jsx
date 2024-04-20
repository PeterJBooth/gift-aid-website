import tickIcon from "../assets/tick-icon.svg";
import openHandIcon from "../assets/hand-open-icon.svg";
import circleIcon from "../assets/circle.svg";
import underline from "../assets/underline1.svg";

const PageTitle = () => {
  return (
    <div className=" relative mb-40  mt-0 desktop:mt-24">
      <img
        src={tickIcon}
        alt="Tick Icon"
        className="absolute left-1/2 top-1/2 -translate-x-[9.5rem] -translate-y-[10rem] scale-75 largePhone:-left-[1.375rem] largePhone:-top-[5.125rem] largePhone:translate-x-0 largePhone:translate-y-0 largePhone:scale-90 tablet:scale-100"
      />
      <div className="max-w-[25rem] largePhone:max-w-max">
        <span className="block text-center text-[45px] font-black leading-tight	 tracking-tight desktop:text-[55px] largeDesktop:text-[65px]">
          Check Your Eligibility
        </span>
        <span className="block text-center text-[45px] font-black leading-tight	 tracking-tight desktop:text-[55px] largeDesktop:text-[65px]">
          for Gift Aid Donations
        </span>
        <img
          src={underline}
          alt="underline"
          className="absolute bottom-1/2 left-1/2 w-32 translate-x-[-1.7rem]  translate-y-[3.9rem] largePhone:bottom-[-0.7rem] largePhone:left-[4.25rem] largePhone:w-36 largePhone:translate-x-0 largePhone:translate-y-0 desktop:bottom-[-0.8rem] desktop:left-[5.4rem] desktop:w-auto largeDesktop:left-[6.2rem] largeDesktop:w-[13rem]"
        />
      </div>
      <div className="absolute bottom-1/2 right-1/2  w-20 translate-x-[10.4rem] translate-y-[7rem] scale-75 largePhone:-bottom-[1rem] largePhone:-right-[4rem] largePhone:translate-x-0 largePhone:translate-y-0 largePhone:scale-90 tablet:scale-100">
        <img src={circleIcon} alt="circle" className="absolute left-0 top-0" />
        <div className="absolute left-[0.77rem] top-[0.35rem] -rotate-[32deg] text-xl font-black text-blue-200">
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
