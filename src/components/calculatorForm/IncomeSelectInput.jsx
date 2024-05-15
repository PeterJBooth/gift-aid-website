import { UseCalculatorContext } from "../../context/CalculatorContext";
import { ValidationMessage } from "./ValidationMessage";

const IncomeSelectInput = ({
  setInputValue,
  id,
  validationMessageTransition,
  validationMessage,
  validationError,
}) => {
  const { activeSelectInput, validationErrors, removeValidationError } =
    UseCalculatorContext();

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
        <p className="flex select-none text-lg font-bold">
          Yearly Income Before Tax *
        </p>
        <div
          className={`flex rounded-md border hover:border-blue-550 hover:border-2${
            activeSelectInput === id
              ? " border-2 border-blue-550 p-0"
              : " border-neutral-100 p-px hover:p-0"
          }`}
        >
          <div className={`flex items-center justify-end pl-4`}>£</div>
          <input
            type="number"
            className="text-input box-border h-[50px] w-full rounded-r-md bg-neutral-25 pl-4 pr-2 text-lg outline-none"
            min="1"
            onChange={(e) => handleInputChange(e)}
            id={id}
          ></input>
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

export { IncomeSelectInput };
