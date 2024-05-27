import { UseCalculatorContext } from "../../context/CalculatorContext";
import { MoreInfoProvider } from "./MoreInfoProvider";
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
        <div className="flex">
          <label for={id} className="flex select-none text-lg font-bold">
            Yearly Income Before Tax *
          </label>
          <MoreInfoProvider
            title={"Yearly Income"}
            content={
              "This is the amount you will earn, before tax, in the 2024/2025 tax year (from 6 April 2024 to 5 April 2025)."
            }
          />
        </div>
        <div
          className={`flex rounded-md border hover:border-2 hover:border-blue-550 ${
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
            required="true"
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
