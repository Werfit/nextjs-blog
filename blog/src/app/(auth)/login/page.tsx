"use client";

import InputWithLabel from "@/components/input-with-label.component";
import { loginSchema, LoginSchema } from "@/schemas/login.schema";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });
  const urlSearchParams = useSearchParams();
  const router = useRouter();

  const submitForm: SubmitHandler<LoginSchema> = async (result) => {
    await signIn("credentials", {
      username: result.username,
      password: result.password,
      redirect: false,
    });
    router.push(urlSearchParams.get("from") ?? "/");
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
        <button
          type="submit"
          className="py-2 px-4 text-gray-800 border-2 border-gray-800 rounded-md hover:bg-gray-800 hover:text-white transition w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
