import { useNavigate } from "react-router-dom";

const GiftAidButton = () => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/what-is-gift-aid");
  };
  return (
    <button
      className="what-is-gift-aid-button"
      onClick={() => {
        handleButtonClick();
      }}
    >
      <div className="what-is-gift-aid-text">What is Gift Aid</div>
    </button>
  );
};

export { GiftAidButton };
