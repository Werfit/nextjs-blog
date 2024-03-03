import { forwardRef, InputHTMLAttributes } from "react";

type InputWithLabelProps = InputHTMLAttributes<HTMLInputElement> & {
  isError: boolean;
  errorMessage?: string;
};

// tailwind needs complete string values for colors
const BORDER_COLOR = {
  DEFAULT: "",
  ERROR: "border-2 border-red-300",
};

const InputWithLabel = forwardRef<HTMLInputElement, InputWithLabelProps>(
  ({ className, isError, errorMessage, ...props }, ref) => {
    const inputStateClasses = `${
      isError ? BORDER_COLOR.ERROR : BORDER_COLOR.DEFAULT
    }`;

    return (
      <div>
        <input
          className={`bg-lightGray-100 w-full py-3 px-4 rounded-md tracking-wider outline-0 transition placeholder:text-sm focus-within:bg-lightGray-50 ${inputStateClasses} ${className}`}
          {...props}
          ref={ref}
          spellCheck="false"
        />
        {errorMessage?.length && (
          <span className="text-xs text-red-500 mt-2 tracking-wider">
            {errorMessage}
          </span>
        )}
      </div>
    );
  },
);

InputWithLabel.displayName = "InputWithLabel";

export default InputWithLabel;
