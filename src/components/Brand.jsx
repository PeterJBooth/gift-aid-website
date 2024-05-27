import { useNavigate } from "react-router-dom";
import logoIcon from "../assets/logo-medium.svg";
import logoIconSmall from "../assets/logo-small.svg";
import { useScreenTypeContext } from "../context/ScreenTypeContext";

const Brand = ({ defaultSize }) => {
  const navigate = useNavigate();
  const { screenType } = useScreenTypeContext();

  const handleBrandingClick = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <a
      className={`flex cursor-pointer select-none items-center gap-2 ${
        screenType.isMobile || defaultSize === "small" ? "" : "my-2 h-11"
      }`}
      onClick={(e) => {
        handleBrandingClick(e);
      }}
      href="./"
      aria-label="Website Home Page"
    >
      <img
        src={
          screenType.isMobile || defaultSize === "small"
            ? logoIconSmall
            : logoIcon
        }
        alt="Verify My Gift Aid Logo"
      />
      <div
        className={`brand-name font-roboto-slab font-black text-black  ${
          screenType.isMobile || defaultSize === "small"
            ? "text-xl tracking-[0.012rem]"
            : "text-3xl tracking-[0.018rem]"
        }`}
      >
        VerifyMyGiftAid
      </div>
    </a>
  );
};

export { Brand };
