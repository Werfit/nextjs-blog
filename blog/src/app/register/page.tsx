"use client";

import InputWithLabel from "@/common/components/input-with-label/input-with-label.component";
import { useForm, SubmitHandler } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import {
  registrationSchema,
  RegistrationSchema,
} from "@/common/schemas/registration.schema";

const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationSchema>({
    resolver: joiResolver(registrationSchema),
  });

  const submitForm: SubmitHandler<RegistrationSchema> = (result) => {
    console.log("wowowowowo");
    console.log(result);
  };

  console.log(errors);
  return (
    <div>
      <form
        className="w-[40vw] flex flex-col gap-2 mx-auto my-5"
        onSubmit={handleSubmit(submitForm)}
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
        <button
          type="submit"
          className="py-2 px-4 text-gray-800 border-2 border-gray-800 rounded-md hover:bg-gray-800 hover:text-white transition w-full"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default Registration;
