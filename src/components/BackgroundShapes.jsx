import backgroundShape from "../assets/background-shape.svg";
import backgroundShape2 from "../assets/background-shape2.svg";
import backgroundShape3 from "../assets/background-shape3.svg";

const BackgroundShapes = () => {
  return (
    <>
      <img src={backgroundShape} alt="" className="background-shape" />
      <div className="background-shape-container">
        <img src={backgroundShape3} alt="" className="background-shape2" />
      </div>
    </>
  );
};

export { BackgroundShapes };
