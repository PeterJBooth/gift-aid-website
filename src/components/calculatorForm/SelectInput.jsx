import toogleIcon from "../../assets/toggle.svg";
import { UseCalculatorContext } from "../../context/CalculatorContext";
import { ValidationMessage } from "./ValidationMessage";

const SelectInput = ({
  inputTitle,
  setSelectValue,
  setInputValue,
  id,
  validationMessageTransition,
  validationMessage,
  validationError,
}) => {
  const { activeSelectInput, validationErrors, removeValidationError } =
    UseCalculatorContext();

  const handleOptionChange = (e) => {
    setSelectValue(e.target.value);
    return;
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value !== "" ? Number(e.target.value) : null;
    setInputValue(inputValue);

    const errorMessageIsRendered = validationErrors.includes(validationError);
    if (errorMessageIsRendered && inputValue != null) {
      removeValidationError(validationError);
    }
  };

  return (
    <>
      <div className="flex w-full flex-col gap-4 py-4">
        <label for={id} className="flex select-none text-lg font-bold">
          {inputTitle}
        </label>
        <div className="flex">
          <div className="single-select relative z-20 rounded-l-md border border-neutral-100 bg-neutral-50 ">
            <div className="">
              <select
                className="my-4 cursor-pointer appearance-none rounded-l-md bg-neutral-50 pl-3 pr-9 text-center text-sm font-bold text-neutral-700 outline-none	"
                onChange={(e) => {
                  handleOptionChange(e);
                }}
              >
                <option>Year</option>
                <option>Month</option>
              </select>{" "}
            </div>

            <img
              src={toogleIcon}
              alt="Toggle Icon To select Year or Month"
              className="select-toggle pointer-events-none absolute right-[0.1rem] top-[4%] h-[94%] w-5 overflow-hidden bg-neutral-50 pr-2"
            />
          </div>
          <div
            className={`flex rounded-r-md border hover:border-2 hover:border-blue-550 ${
              activeSelectInput === id
                ? " border-2 border-blue-550 p-0"
                : " border-neutral-100 p-px hover:p-0"
            }`}
          >
            <div
              className={`flex items-center justify-end pl-2 ${activeSelectInput === id ? "" : ""}`}
            >
              £
            </div>
            <input
              type="number"
              className="text-input box-border w-full rounded-r-md bg-neutral-25 pl-4 pr-2 text-lg outline-none"
              min="1"
              onChange={(e) => handleInputChange(e)}
              id={id}
              required="true"
            ></input>
          </div>
        </div>
      </div>
      {validationMessageTransition((style, item) =>
        item === true ? (
          <ValidationMessage style={style} message={validationMessage} />
        ) : (
          ""
        ),
      )}
    </>
  );
};

export { SelectInput };
