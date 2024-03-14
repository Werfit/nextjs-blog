import { ButtonHTMLAttributes } from "react";

type FormSubmitButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
};

const FormSubmitButton: React.FC<FormSubmitButtonProps> = ({
  isLoading,
  children,
  ...props
}) => {
  const pending = typeof isLoading !== "undefined" && isLoading;

  return (
    <button
      {...props}
      className={`text-white font-medium tracking-wider transition rounded-md py-2 text-lg ${
        pending ? "bg-primary-400/50" : "bg-primary-500 hover:bg-primary-400"
      }`}
      disabled={pending}
      aria-disabled={pending}
    >
      {pending ? "Loading..." : children}
    </button>
  );
};

export { FormSubmitButton };
