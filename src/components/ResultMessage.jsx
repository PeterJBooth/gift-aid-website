import checkMark from "../assets/check-mark2.svg";

const ResultMessage = ({ canClaimGiftAid, darkText, smallText }) => {
  return (
    <>
      {canClaimGiftAid ? (
        <div
          className={`relative text-center text-[32px] ${smallText ? "largePhone:text-[32px]" : "largePhone:text-[40px]"} font-semibold tracking-[-0.029rem] ${darkText ? "text-black" : "text-neutral-25"} largeDesktop:${smallText ? "text-[38px]" : "text-[46px]"}`}
        >
          You can tick the
          <br /> gift aid box!
          <img
            src={checkMark}
            alt="check mark"
            className={`absolute  ${smallText ? " right-[2.3rem] top-[-1.9rem] w-[56px]" : "right-[1.70rem] top-[-2.40rem] largePhone:right-[3.10rem] largePhone:top-[-2.30rem] largeDesktop:right-[3.35rem]  largeDesktop:top-[-2.85rem] largeDesktop:w-20"}    `}
          />
        </div>
      ) : (
        <div
          className={`relative text-center text-[32px]  ${smallText ? "largePhone:text-[32px]" : "largePhone:text-[40px]"}   font-semibold tracking-[-0.029rem] ${darkText ? "text-black" : "text-neutral-25"} ${smallText ? "largeDesktop:text-[38px]" : "largeDesktop:text-[46px]"}`}
        >
          Sorry,
          <br /> you're unable tick the <br /> gift aid box
        </div>
      )}
    </>
  );
};

export { ResultMessage };
