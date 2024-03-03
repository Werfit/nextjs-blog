"use client";

import { InputWithLabel } from "@/components/form/input-with-label.component";
import { loginSchema, LoginSchema } from "@/schemas/login.schema";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormSubmitButton } from "@/components/form/form-submit-button.component";
import Link from "next/link";

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

  const submitForm: SubmitHandler<LoginSchema> = async (result) => {
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
      router.push(urlSearchParams.get("from") ?? "/");
    }

    if (!response.ok) {
      setError("root", { message: response.error ?? "" });
    }
  };

  return (
    <>
      <form
        className="w-[40vw] flex flex-col gap-2 mx-auto mt-5 mb-2"
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

        <FormSubmitButton>Login</FormSubmitButton>

        {errors.root && (
          <p className="text-sm text-center text-rose-500">
            {errors.root.message}
          </p>
        )}
      </form>

      <div className="text-sm text-center text-gray-500">
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
