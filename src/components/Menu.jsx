import { useEffect, useState } from "react";
import { usePopupContext } from "../context/PopupContext";
import { GiftAidButton } from "./GiftAidButton";
import { useDrag } from "react-use-gesture";
import { useSpring, animated } from "@react-spring/web";
import { Header } from "./Header";

const Menu = ({ menuHeight, springProps }) => {
  const [{ y }, api] = springProps;

  const bindMenuPosition = useDrag(
    ({ down, movement: [mx, my], offset: [ox, oy], distance }) => {
      if (down) {
        api.start({ y: my, immediate: true });
      } else {
        if (my < -100) {
          api.start({ y: -menuHeight, immediate: false });
          console.log("inactive");
          console.log(-menuHeight);
        } else {
          api.start({ y: 0, immediate: false });
        }
      }
      api.start({
        y: down ? my : my < -100 ? -menuHeight - 5 : 0,
        immediate: down,
      });
    },
    {
      bounds: { bottom: 0 },
      rubberband: 0.1,
    }
  );

  return (
    <>
      <animated.menu
        {...bindMenuPosition()}
        className="menu"
        style={{ y, touchAction: "none" }}
      >
        <GiftAidButton />
        <div className="pill"></div>
      </animated.menu>
    </>
  );
};

export { Menu };
