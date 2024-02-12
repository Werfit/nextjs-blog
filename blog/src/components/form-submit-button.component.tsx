import { ButtonHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";

type FormSubmitButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const FormSubmitButton: React.FC<FormSubmitButtonProps> = (props) => {
  const { pending } = useFormStatus();

  return (
    <button
      {...props}
      className="py-2 px-4 text-gray-800 border-2 border-gray-800 rounded-md hover:bg-gray-800 hover:text-white transition w-full disabled:bg-white disabled:border-gray-500 disabled:text-gray-500"
      disabled={pending}
      aria-disabled={pending}
    />
  );
};

export default FormSubmitButton;
