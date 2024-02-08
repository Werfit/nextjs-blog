"use client";

import InputWithLabel from "@/common/components/input-with-label/input-with-label.component";
import { loginSchema, LoginSchema } from "@/common/schemas/login.schema";
import { useForm, SubmitHandler } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: joiResolver(loginSchema),
  });

  const submitForm: SubmitHandler<LoginSchema> = (result) => {
    console.log("wowowowowo");
    console.log(result);
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
          isError={!!errors.username}
          errorMessage={errors.username?.message}
        />
        <InputWithLabel
          label={"Password"}
          type="password"
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
