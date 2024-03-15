"use client";

import { InputWithLabel } from "@/components/form/input-with-label.component";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  RegistrationSchema,
  registrationSchema,
} from "@/schemas/registration.schema";
import { FormSubmitButton } from "@/components/form/form-submit-button.component";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { request } from "@/services/http.service";
import { useState } from "react";

const SignUp = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<RegistrationSchema>({
    resolver: zodResolver(registrationSchema),
  });
  const [isLoading, setIsLoading] = useState(false);
  const urlSearchParams = useSearchParams();
  const router = useRouter();

  const submitHandler: SubmitHandler<RegistrationSchema> = async (data) => {
    setIsLoading(true);
    const requestBody = { username: data.username, password: data.password };

    try {
      await request("/api/auth/signup", "POST", requestBody);

      const loginResponse = await signIn("credentials", {
        username: data.username,
        password: data.password,
        redirect: false,
      });

      if (loginResponse && loginResponse.ok) {
        router.push(urlSearchParams.get("from") ?? "/");
      }
    } catch (error) {
      const err = error as Error;
      setError("root", { message: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form
        className="w-[40vw] flex flex-col gap-2 mx-auto mt-5 mb-2"
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

        <FormSubmitButton isLoading={isLoading}>Continue</FormSubmitButton>
        {errors.root && (
          <p className="text-sm text-center text-rose-500">
            {errors.root.message}
          </p>
        )}
      </form>

      <div className="text-sm text-center text-gray-500">
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