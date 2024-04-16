import { useNavigate } from "react-router-dom";
import logoSmall from "../assets/logo-small.svg";
import { useScreenTypeContext } from "../context/ScreenTypeContext";
import { Brand } from "./Brand";

const Footer = () => {
  const { screenType } = useScreenTypeContext();

  return (
    <div className="flex flex-col gap-6 mb-8 px-custom max-w-10xl mx-auto mt-auto w-full">
      <hr className=" bg-neutral-200 border-none h-px" />
      <div className="flex items-end justify-between gap-4">
        <div className="flex  flex-col tablet:flex-row gap-6 w-full tablet:w-auto tablet:items-end">
          <div className="-mb-0.5">
            <Brand defaultSize="small" />
          </div>
          <div className="flex justify-between w-full tablet:w-auto gap-4">
            <div className="text-xs2 leading-4">
              Copyright © 2024 VeryifyMyGiftAid
            </div>
            {screenType.isMobile && (
              <div className="text-xs2 leading-4">United Kingdom</div>
            )}
          </div>
        </div>
        {!screenType.isMobile && (
          <div className="text-xs2 leading-4">United Kingdom</div>
        )}
      </div>
    </div>
  );
};

export { Footer };
