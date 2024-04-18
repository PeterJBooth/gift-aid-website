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
        className="fixed -top-8 right-0 left-0 h-48 rounded-3xl bg-neutral-25 flex flex-col justify-end items-center pb-2 z-20
        shadow-3xl"
        style={{ y, touchAction: "none" }}
      >
        <GiftAidButton />
        <div className="pill h-2.5 w-32 mt-8 bg-neutral-100 opacity-75 rounded-lg"></div>
      </animated.menu>
    </>
  );
};

export { Menu };
