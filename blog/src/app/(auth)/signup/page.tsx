"use client";

import InputWithLabel from "@/components/input-with-label.component";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  RegistrationSchema,
  registrationSchema,
} from "@/schemas/registration.schema";
import FormSubmitButton from "@/components/form-submit-button.component";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

const SignUp = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<RegistrationSchema>({
    resolver: zodResolver(registrationSchema),
  });
  const urlSearchParams = useSearchParams();
  const router = useRouter();

  const submitHandler: SubmitHandler<RegistrationSchema> = async (data) => {
    const requestBody = { username: data.username, password: data.password };

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("Registration process failed");
        return;
      }

      await signIn("credentials", {
        username: data.username,
        password: data.password,
        redirect: false,
      });
      router.push(urlSearchParams.get("from") ?? "/");
    } catch (error) {
      const err = error as Error;
      // TODO: handle error
      console.group("Registration process");
      console.error("Registration process failed");
      console.error(`Reason: ${err.message}`);
      console.groupEnd();
    }
  };

  return (
    <div>
      <form
        className="w-[40vw] flex flex-col gap-2 mx-auto my-5"
        // action={registerUser}
        onSubmit={handleSubmit(submitHandler)}
        method="POST"
      >
        <InputWithLabel
          label={"Username"}
          placeholder="Username"
          {...register("username")}
          isError={!!errors.username}
          errorMessage={errors.username?.message}
        />
        <InputWithLabel
          label={"Password"}
          type="password"
          placeholder="Password"
          {...register("password")}
          isError={!!errors.password}
          errorMessage={errors.password?.message}
        />
        <InputWithLabel
          label={"Confirm password"}
          placeholder="Re-enter the password above"
          type="password"
          {...register("confirmPassword")}
          isError={!!errors.confirmPassword}
          errorMessage={errors.confirmPassword?.message}
        />

        <FormSubmitButton>Continue</FormSubmitButton>
      </form>
    </div>
  );
};

export default SignUp;
