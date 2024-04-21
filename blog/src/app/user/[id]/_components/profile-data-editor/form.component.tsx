"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { UserResponse } from "@/actions/common.types";
import { updateProfile } from "@/actions/user/profile/profile.action";
import { FormSubmitButton } from "@/components/form/form-submit-button/form-submit-button.component";
import { useFormSubmitButtonState } from "@/components/form/form-submit-button/use-form-submit-button-state.hook";
import { InputWithLabel } from "@/components/form/input-with-label.component";
import { useNotificationsContext } from "@/provider/notifications/notifications.hook";
import {
  UserProfileSchema,
  userProfileSchema,
} from "@/schemas/user-profile.schema";

type ProfileDataEditorFormProps = {
  className?: string;
  user: UserResponse;
};

const ProfileDataEditorForm: React.FC<ProfileDataEditorFormProps> = ({
  className,
  user,
}) => {
  const { formState, startLoading, finishLoading, reset } =
    useFormSubmitButtonState();
  const { actions } = useNotificationsContext();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset: resetForm,
  } = useForm<UserProfileSchema>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      username: user.username,
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
    },
  });

  const onSubmit: SubmitHandler<UserProfileSchema> = async (userData) => {
    startLoading();

    try {
      await updateProfile({
        id: user.id,
        ...userData,
      });

      finishLoading({ isSuccess: true, error: null });
    } catch (err) {
      const error = err as Error;
      actions.error(error.message);
      finishLoading({ isSuccess: false, error: error.message });
      resetForm();
    }

    reset();
  };

  return (
    <form className={className} onSubmit={handleSubmit(onSubmit)}>
      <InputWithLabel
        {...register("username")}
        placeholder="johndoe"
        isError={!!errors.username}
        errorMessage={errors.username?.message}
      />
      <InputWithLabel
        {...register("firstName")}
        placeholder="John"
        isError={!!errors.firstName}
        errorMessage={errors.firstName?.message}
      />
      <InputWithLabel
        {...register("lastName")}
        placeholder="Doe"
        isError={!!errors.lastName}
        errorMessage={errors.lastName?.message}
      />

      <FormSubmitButton
        isLoading={formState.isLoading}
        isSuccess={formState.isSuccess}
        isError={Boolean(formState.error)}
        successContent="Saved"
      >
        Save
      </FormSubmitButton>
    </form>
  );
};

export { ProfileDataEditorForm };
