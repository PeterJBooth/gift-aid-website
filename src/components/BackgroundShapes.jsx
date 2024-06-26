import backgroundShape from "../assets/background-shape.svg";
import backgroundShape3 from "../assets/background-shape3.svg";

const BackgroundShapes = () => {
  return (
    <>
      <img
        src={backgroundShape}
        alt="Curved shape in the background for decorative purposes"
        className="absolute	-top-6 left-0 -z-10 w-full max-w-2xl"
      />
      <div className="absolute bottom-0 right-0 top-[80rem] -z-10 overflow-hidden desktop:top-[42rem]">
        <img
          src={backgroundShape3}
          alt="Curved shape in the background for decorative purposes"
          className="w-[70vw] max-w-3xl"
        />
      </div>
    </>
  );
};

export { BackgroundShapes };
