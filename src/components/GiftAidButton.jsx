import { useNavigate } from "react-router-dom";

const GiftAidButton = () => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/what-is-gift-aid");
  };
  return (
    <>
      <button
        className=" bg-turquoise-400 rounded-xl shadow-md hover:bg-opacity-80 active:bg-opacity-100 active:shadow-none"
        onClick={() => {
          handleButtonClick();
        }}
      >
        <div className="py-4 px-8 text-white font-medium text-lg">
          What is Gift Aid
        </div>
      </button>
    </>
  );
};

export { GiftAidButton };
