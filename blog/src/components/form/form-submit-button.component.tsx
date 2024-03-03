import { ButtonHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";

type FormSubmitButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const FormSubmitButton: React.FC<FormSubmitButtonProps> = (props) => {
  const { pending } = useFormStatus();

  return (
    <button
      {...props}
      className="bg-primary-500 text-white font-medium tracking-wider transition rounded-md py-2 text-lg hover:bg-primary-400"
      disabled={pending}
      aria-disabled={pending}
    />
  );
};

export default FormSubmitButton;
