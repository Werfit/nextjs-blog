"use client";

import InputWithLabel from "@/components/form/input-with-label.component";
import { loginSchema, LoginSchema } from "@/schemas/login.schema";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import FormSubmitButton from "@/components/form/form-submit-button.component";

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
    <div>
      <form
        className="w-[40vw] flex flex-col gap-2 mx-auto my-5"
        onSubmit={handleSubmit(submitForm)}
      >
        <InputWithLabel
          label={"Username"}
          {...register("username")}
          placeholder="Username"
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

        <FormSubmitButton>Login</FormSubmitButton>

        {errors.root && (
          <p className="text-sm text-center text-rose-500">
            {errors.root.message}
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
