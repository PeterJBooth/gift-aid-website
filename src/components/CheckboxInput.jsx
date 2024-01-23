import checkMark from "../assets/check-mark.svg";

const CheckboxInput = ({ title }) => {
  return (
    <div className="checkbox-container">
      <div className="checkbox">
        <img className="check-mark" src={checkMark} alt="check mark" />
      </div>
      <p className="checkbox-title">{title}</p>
    </div>
  );
};
export { CheckboxInput };
