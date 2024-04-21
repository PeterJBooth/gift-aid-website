import { useNavigate } from "react-router-dom";
import logoIcon from "../assets/logo-medium.svg";
import logoIconSmall from "../assets/logo-small.svg";
import { useScreenTypeContext } from "../context/ScreenTypeContext";

const Brand = ({ defaultSize }) => {
  const navigate = useNavigate();
  const { screenType } = useScreenTypeContext();

  const handleBrandingClick = () => {
    navigate("/");
  };

  return (
    <div
      className={`flex gap-2 items-center cursor-pointer ${
        screenType.isMobile || defaultSize === "small" ? "" : "h-11 my-2"
      }`}
      onClick={() => {
        handleBrandingClick();
      }}
    >
      <img
        src={
          screenType.isMobile || defaultSize === "small"
            ? logoIconSmall
            : logoIcon
        }
        alt="logo icon"
      />
      <div
        className={`brand-name text-black font-roboto-slab font-black  ${
          screenType.isMobile || defaultSize === "small"
            ? "text-xl tracking-[0.012rem]"
            : "text-3xl tracking-[0.018rem]"
        }`}
      >
        VerifyMyGiftAid
      </div>
    </div>
  );
};

export { Brand };

// <div
//   className="brand-logo-and-title small"
//   onClick={() => {
//     handleClick();
//   }}
// >
//   <img src={logoSmall} alt="logo icon" />
//   <div className="brand-name small">VerifyMyGiftAid</div>
// </div>;
