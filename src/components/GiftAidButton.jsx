import { useNavigate } from "react-router-dom";

const GiftAidButton = () => {
  const navigate = useNavigate();
  const handleButtonClick = (e) => {
    e.preventDefault();
    navigate("/what-is-gift-aid");
  };
  return (
    <>
      <a
        className=" rounded-xl bg-turquoise-400 px-8 py-4 text-lg font-medium text-white shadow-md hover:bg-opacity-80 active:bg-opacity-100 active:shadow-none"
        onClick={(e) => {
          handleButtonClick(e);
        }}
        href="./what-is-gift-aid"
        aria-label="Website Gift Aid Information Page"
      >
        What is Gift Aid
      </a>
    </>
  );
};

export { GiftAidButton };
