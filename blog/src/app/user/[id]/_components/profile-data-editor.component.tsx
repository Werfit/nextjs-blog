"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";

import { updateAvatar } from "@/actions/user/profile.action";
import { AvatarUploader } from "@/components/avatar/avatar-uploader.component";
import { FormSubmitButton } from "@/components/form/form-submit-button/form-submit-button.component";
import { InputWithLabel } from "@/components/form/input-with-label.component";
import {
  UserProfileSchema,
  userProfileSchema,
} from "@/schemas/user-profile.schema";
import { combineClassNames } from "@/utils/class-name.util";

type ProfileDataEditorProps = {
  className?: string;
  user: Omit<User, "password" | "createdAt">;
};

const ProfileDataEditor: React.FC<ProfileDataEditorProps> = ({
  user,
  className,
}) => {
  const { data, update } = useSession();

  const {
    register,
    formState: { errors },
  } = useForm<UserProfileSchema>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      username: user.username,
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
    },
  });

  return (
    <div className={combineClassNames(className, "flex gap-10")}>
      <AvatarUploader
        username={user.username}
        firstName={user.firstName ?? ""}
        lastName={user.lastName ?? ""}
        imageUrl={user.imageUrl ?? ""}
        className="h-40 w-40 rounded-3xl"
        onLoad={async (url) => {
          try {
            await updateAvatar(url);

            if (user.id === data?.user.id) {
              update({ imageUrl: url });
            }
          } catch (error) {
            console.error(error);
          }
        }}
      />

      <form className="flex flex-1 flex-col gap-4">
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

        <FormSubmitButton>Save</FormSubmitButton>
      </form>
    </div>
  );
};

export { ProfileDataEditor };
