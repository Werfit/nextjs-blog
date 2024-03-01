import { forwardRef, InputHTMLAttributes } from "react";

type InputWithLabelProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  isError: boolean;
  errorMessage?: string;
};

// tailwind needs complete string values for colors
const BORDER_COLOR = {
  DEFAULT: "border-gray-300",
  ERROR: "border-red-300",
};

const SHADOW_COLOR = {
  DEFAULT: "focus-within:border-gray-200/50",
  ERROR: "focus-within:border-red-200/50",
};

const InputWithLabel = forwardRef<HTMLInputElement, InputWithLabelProps>(
  ({ label, className, isError, errorMessage, ...props }, ref) => {
    return (
      <label
        className={`flex flex-col border-2 border-gray-200 py-1 px-3 rounded focus-within:shadow-md focus-within:shadow-gray-200/50 transition ${
          isError ? BORDER_COLOR.ERROR : BORDER_COLOR.DEFAULT
        } ${isError ? SHADOW_COLOR.ERROR : SHADOW_COLOR.DEFAULT} ${className}`}
      >
        <p className="text-xs text-gray-500 tracking-wider">{label}</p>
        <input className="outline-0 placeholder:text-sm" {...props} ref={ref} />
        {errorMessage?.length && (
          <span className="text-xs text-red-500 mt-2 ">{errorMessage}</span>
        )}
      </label>
    );
  },
);

InputWithLabel.displayName = "InputWithLabel";

export default InputWithLabel;
