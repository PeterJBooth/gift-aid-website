import logoIcon from "../assets/logo-medium.svg";
import logoIconSmall from "../assets/logo-small.svg";
import { useScreenTypeContext } from "../context/ScreenTypeContext";
import burgerIcon from "../assets/burger.svg";
import { GiftAidButton } from "./GiftAidButton";
import { Menu } from "./Menu";
import { useSpring } from "@react-spring/web";
import { useNavigate } from "react-router-dom";

const Header = ({ giftAidButtonActive }) => {
  const navigate = useNavigate();
  const { screenType } = useScreenTypeContext();
  const MENU_HEIGHT = 170;

  const handleMenuButtonClick = () => {
    openMenu();
  };

  const loadMenuAndMenuButton = () => {
    if (giftAidButtonActive) {
      if (!screenType.isMobile) {
        return <GiftAidButton />;
      } else {
        return (
          <>
            <img
              src={burgerIcon}
              alt="Menu Button"
              onClick={() => handleMenuButtonClick()}
              // onDrag={}
            />
            <Menu menuHeight={MENU_HEIGHT} springProps={[{ y }, api]} />
          </>
        );
      }
    }
  };

  const [{ y }, api] = useSpring(() => ({ x: 0, y: -MENU_HEIGHT - 5 }));
  const openMenu = () => {
    api.start({ y: 0 });
  };

  const handleBrandingClick = () => {
    navigate("/");
  };

  return (
    <header>
      <div
        className="brand-logo-and-title"
        onClick={() => {
          handleBrandingClick();
        }}
      >
        <img
          src={screenType.isMobile ? logoIconSmall : logoIcon}
          alt="logo icon"
        />
        <div
          className={screenType.isMobile ? "brand-name small" : "brand-name"}
        >
          VerifyMyGiftAid
        </div>
      </div>
      {loadMenuAndMenuButton()}
    </header>
  );
};

export { Header };
