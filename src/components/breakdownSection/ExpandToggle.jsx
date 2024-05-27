import vIcon from "../../assets/info-page/v-icon.svg";

const ExpandToggle = ({ handleClick, isExpanded }) => {
  return (
    <div
      className="w-full pb-4"
      onClick={() => {
        handleClick();
      }}
    >
      <img
        src={vIcon}
        alt="Toggle Icon to Expand or Close Question Card"
        className={`mx-auto mt-[0.20rem] w-5 cursor-pointer transition-all hover:opacity-70 ${isExpanded ? "v-icon" : "v-icon rotate-180"}`}
        onClick={() => {
          handleClick();
        }}
      />
    </div>
  );
};

export { ExpandToggle };
