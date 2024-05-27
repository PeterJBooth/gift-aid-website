import { useScreenTypeContext } from "../context/ScreenTypeContext";
import { Brand } from "./Brand";

const Footer = () => {
  const { screenType } = useScreenTypeContext();

  return (
    <footer className="mx-auto mb-8 mt-auto flex w-full max-w-10xl flex-col gap-6 px-custom">
      <hr className=" h-px border-none bg-neutral-200" />
      <div className="flex items-end justify-between gap-4">
        <div className="flex  w-full flex-col gap-6 tablet:w-auto tablet:flex-row tablet:items-end">
          <div className="-mb-0.5">
            <Brand defaultSize="small" />
          </div>
          <div className="flex w-full justify-between gap-4 tablet:w-auto">
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
    </footer>
  );
};

export { Footer };
