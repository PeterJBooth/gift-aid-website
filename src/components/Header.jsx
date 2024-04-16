import logoIcon from "../assets/logo-medium.svg";
import logoIconSmall from "../assets/logo-small.svg";
import { useScreenTypeContext } from "../context/ScreenTypeContext";
import burgerIcon from "../assets/burger.svg";
import { GiftAidButton } from "./GiftAidButton";
import { Menu } from "./Menu";
import { useSpring } from "@react-spring/web";
import { useNavigate } from "react-router-dom";
import { Brand } from "./Brand";

const Header = ({ giftAidButtonActive }) => {
  const { screenType } = useScreenTypeContext();
  const MENU_HEIGHT = 170;

  const handleMenuButtonClick = () => {
    openMenu();
  };

  const loadMenuAndMenuButton = () => {
    if (!giftAidButtonActive) {
      return;
    }

    if (!screenType.isMobile) {
      return <GiftAidButton />;
    } else {
      return (
        <>
          <img
            src={burgerIcon}
            alt="Menu Button"
            onClick={() => handleMenuButtonClick()}
          />
          <Menu menuHeight={MENU_HEIGHT} springProps={[{ y }, api]} />
        </>
      );
    }
  };

  const [{ y }, api] = useSpring(() => ({ x: 0, y: -MENU_HEIGHT - 5 }));
  const openMenu = () => {
    api.start({ y: 0 });
  };

  return (
    <header className="flex justify-between max-w-10xl px-custom mx-auto mt-6  w-full">
      <Brand />
      {loadMenuAndMenuButton()}
    </header>
  );
};

export { Header };
