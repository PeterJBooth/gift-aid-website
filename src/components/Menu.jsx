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
    },
  );

  return (
    <>
      <animated.div
        {...bindMenuPosition()}
        className="fixed -top-8 left-0 right-0 z-20 flex h-48 flex-col items-center justify-end rounded-3xl bg-neutral-25 pb-2
        shadow-3xl"
        style={{ y, touchAction: "none" }}
      >
        <nav>
          <ul>
            <li className="flex">
              <GiftAidButton />
            </li>
          </ul>
        </nav>
        <div className="pill mt-8 h-2.5 w-32 rounded-lg bg-neutral-100 opacity-75"></div>
      </animated.div>
    </>
  );
};

export { Menu };
