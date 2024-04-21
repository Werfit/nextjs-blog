"use client";

import { UserResponse } from "@/actions/common.types";
import { updateAvatar } from "@/actions/user/profile/profile.action";
import { AvatarUploader } from "@/app/user/[id]/_components/avatar/avatar-uploader.component";
import { useNotificationsContext } from "@/provider/notifications/notifications.hook";
import { combineClassNames } from "@/utils/class-name.util";

import { ProfileDataEditorForm } from "./form.component";

type ProfileDataEditorProps = {
  className?: string;
  user: UserResponse;
};

const ProfileDataEditor: React.FC<ProfileDataEditorProps> = ({
  user,
  className,
}) => {
  const { actions } = useNotificationsContext();

  return (
    <div
      className={combineClassNames(
        className,
        "flex flex-col gap-10 md:flex-row",
      )}
    >
      <AvatarUploader
        username={user.username}
        firstName={user.firstName ?? ""}
        lastName={user.lastName ?? ""}
        imageUrl={user.imageUrl ?? ""}
        className="h-40 w-full rounded-3xl md:w-40"
        onLoad={async (url) => {
          try {
            await updateAvatar(url);
          } catch (err) {
            const error = err as Error;
            actions.error(error.message);
          }
        }}
      />

      <ProfileDataEditorForm
        user={user}
        className="flex flex-1 flex-col gap-4"
      />
    </div>
  );
};

export { ProfileDataEditor };
