"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";

import { FormSubmitButton } from "@/components/form/form-submit-button/form-submit-button.component";
import { useFormSubmitButtonState } from "@/components/form/form-submit-button/use-form-submit-button-state.hook";
import { InputWithLabel } from "@/components/form/input-with-label.component";
import { LoginSchema, loginSchema } from "@/schemas/login.schema";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });
  const urlSearchParams = useSearchParams();
  const router = useRouter();

  const { formState, startLoading, finishLoading, reset } =
    useFormSubmitButtonState();

  const submitForm: SubmitHandler<LoginSchema> = async (result) => {
    startLoading();
    try {
      const response = await signIn("credentials", {
        username: result.username,
        password: result.password,
        redirect: false,
      });

      if (!response) {
        setError("root", { message: "Something went wrong" });
        return;
      }

      if (response.ok) {
        finishLoading({ isSuccess: true, error: null });
        router.push(urlSearchParams.get("from") ?? "/");
      }

      if (!response.ok) {
        finishLoading({ isSuccess: false, error: response.error });
        setError("root", { message: response.error ?? "" });
      }
    } catch (err) {
      const error = err as Error;
      finishLoading({ isSuccess: false, error: error.message });
    }

    reset();
  };

  return (
    <>
      <form
        className="mx-auto mb-2 mt-5 flex flex-col gap-2 md:w-[40vw]"
        onSubmit={handleSubmit(submitForm)}
      >
        <InputWithLabel
          {...register("username")}
          placeholder="Username"
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

        <FormSubmitButton
          className="mt-2 text-sm"
          isLoading={formState.isLoading}
          isSuccess={formState.isSuccess}
          isError={Boolean(formState.error)}
        >
          Login
        </FormSubmitButton>

        {errors.root && (
          <p className="text-center text-sm text-rose-500">
            {errors.root.message}
          </p>
        )}
      </form>

      <div className="text-center text-sm text-gray-500">
        Do not have an account yet?{" "}
        <Link href="/auth/signup" className="text-primary-500">
          Sign up
        </Link>{" "}
        here
      </div>
    </>
  );
};

export default Login;
