"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { updatePassword } from "@/actions/user/profile/profile.action";
import { FormSubmitButton } from "@/components/form/form-submit-button/form-submit-button.component";
import { useFormSubmitButtonState } from "@/components/form/form-submit-button/use-form-submit-button-state.hook";
import { InputWithLabel } from "@/components/form/input-with-label.component";
import {
  UpdatePasswordSchema,
  updatePasswordSchema,
} from "@/schemas/user-profile.schema";

type SecurityPageProps = {
  params: {
    id: string;
  };
};

const SecurityPage: React.FC<SecurityPageProps> = ({ params }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<UpdatePasswordSchema>({
    resolver: zodResolver(updatePasswordSchema),
  });

  const { formState, startLoading, finishLoading, reset } =
    useFormSubmitButtonState();

  const onSubmit: SubmitHandler<UpdatePasswordSchema> = async (formData) => {
    startLoading();

    try {
      await updatePassword({
        id: params.id,
        oldPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });

      finishLoading({ isSuccess: true, error: null });
      setValue("currentPassword", "");
      setValue("newPassword", "");
      setValue("newPasswordConfirmation", "");
    } catch (err) {
      const error = err as Error;

      finishLoading({ isSuccess: true, error: error.message });
    }

    reset();
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <InputWithLabel
        type="password"
        placeholder="Current password"
        isError={Boolean(errors.currentPassword)}
        errorMessage={errors.currentPassword?.message}
        className="w-full"
        required
        {...register("currentPassword")}
      />
      <InputWithLabel
        type="password"
        placeholder="New password"
        isError={Boolean(errors.newPassword)}
        errorMessage={errors.newPassword?.message}
        className="mt-2 w-full"
        required
        {...register("newPassword")}
      />
      <InputWithLabel
        type="password"
        placeholder="Confirm new password"
        isError={Boolean(errors.newPasswordConfirmation)}
        errorMessage={errors.newPasswordConfirmation?.message}
        className="w-full"
        required
        {...register("newPasswordConfirmation")}
      />

      <FormSubmitButton
        isLoading={formState.isLoading}
        isSuccess={formState.isSuccess}
        isError={Boolean(formState.error)}
        className="mt-2 text-sm"
        successContent="Saved"
      >
        Save
      </FormSubmitButton>
    </form>
  );
};

export default SecurityPage;
