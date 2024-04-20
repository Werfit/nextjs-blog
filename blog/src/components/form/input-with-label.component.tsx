import { forwardRef, InputHTMLAttributes } from "react";

type InputWithLabelProps = InputHTMLAttributes<HTMLInputElement> & {
  isError?: boolean;
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
          className={`w-full rounded-md bg-lightGray-100 px-4 py-3 tracking-wider outline-0 transition placeholder:text-sm focus-within:bg-lightGray-50 ${inputStateClasses} ${className}`}
          {...props}
          ref={ref}
          spellCheck="false"
        />
        {errorMessage?.length && (
          <span className="mt-2 text-xs tracking-wider text-red-500">
            {errorMessage}
          </span>
        )}
      </div>
    );
  },
);

InputWithLabel.displayName = "InputWithLabel";

export { InputWithLabel };
