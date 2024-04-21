import { useNavigate } from "react-router-dom";

const GiftAidButton = () => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/what-is-gift-aid");
  };
  return (
    <>
      <button
        className=" rounded-xl bg-turquoise-400 shadow-md hover:bg-opacity-80 active:bg-opacity-100 active:shadow-none"
        onClick={() => {
          handleButtonClick();
        }}
      >
        <div className="px-8 py-4 text-lg font-medium text-white">
          What is Gift Aid
        </div>
      </button>
    </>
  );
};

export { GiftAidButton };
