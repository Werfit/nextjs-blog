"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";

import { FormSubmitButton } from "@/components/form/form-submit-button/form-submit-button.component";
import { useFormSubmitButtonState } from "@/components/form/form-submit-button/use-form-submit-button-state.hook";
import { InputWithLabel } from "@/components/form/input-with-label.component";
import {
  RegistrationSchema,
  registrationSchema,
} from "@/schemas/registration.schema";
import { request } from "@/services/http.service";

const SignUp = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<RegistrationSchema>({
    resolver: zodResolver(registrationSchema),
  });
  const { formState, startLoading, finishLoading, reset } =
    useFormSubmitButtonState();

  const urlSearchParams = useSearchParams();
  const router = useRouter();

  const submitHandler: SubmitHandler<RegistrationSchema> = async (data) => {
    startLoading();

    const requestBody = { username: data.username, password: data.password };

    try {
      await request("/api/auth/signup", "POST", requestBody);

      const loginResponse = await signIn("credentials", {
        username: data.username,
        password: data.password,
        redirect: false,
      });

      finishLoading({ isSuccess: true, error: null });
      if (loginResponse && loginResponse.ok) {
        router.push(urlSearchParams.get("from") ?? "/");
      }
    } catch (err) {
      const error = err as Error;
      setError("root", { message: error.message });
      finishLoading({ isSuccess: false, error: error.message });
    }

    reset();
  };

  return (
    <>
      <form
        className="mx-auto mb-2 mt-5 flex flex-col gap-2 md:w-[40vw]"
        onSubmit={handleSubmit(submitHandler)}
        method="POST"
      >
        <InputWithLabel
          placeholder="Username"
          {...register("username")}
          isError={!!errors.username}
          errorMessage={errors.username?.message}
        />
        <InputWithLabel
          type="password"
          placeholder="Password"
          {...register("password")}
          isError={!!errors.password}
          errorMessage={errors.password?.message}
        />
        <InputWithLabel
          placeholder="Re-enter the password above"
          type="password"
          {...register("confirmPassword")}
          isError={!!errors.confirmPassword}
          errorMessage={errors.confirmPassword?.message}
        />

        <FormSubmitButton
          isLoading={formState.isLoading}
          isSuccess={formState.isSuccess}
          isError={Boolean(formState.error)}
          className="mt-2 text-sm"
        >
          Continue
        </FormSubmitButton>
        {errors.root && (
          <p className="text-center text-sm text-rose-500">
            {errors.root.message}
          </p>
        )}
      </form>

      <div className="text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-primary-500">
          Log in
        </Link>{" "}
        here
      </div>
    </>
  );
};

export default SignUp;
