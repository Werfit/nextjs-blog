"use client";

import { Session } from "next-auth";
import { useOptimistic } from "react";

import { follow, unFollow } from "@/actions/user/followers/followers.action";
import { UserWithCurrentUserSubscriber } from "@/actions/user/followers/followers.types";
import { AvatarUploader } from "@/app/user/[id]/_components/avatar/avatar-uploader.component";
import { InputWithLabel } from "@/components/form/input-with-label.component";
import { useNotificationsContext } from "@/provider/notifications/notifications.hook";
import { combineClassNames } from "@/utils/class-name.util";

type ProfileDataViewerProps = {
  className?: string;
  user?: Session["user"];
  profile: NonNullable<UserWithCurrentUserSubscriber>;
};

const ProfileDataViewer: React.FC<ProfileDataViewerProps> = ({
  profile,
  user,
  className,
}) => {
  const [optimisticIsSubscribed, addOptimisticIsSubscribed] = useOptimistic<
    boolean,
    void
  >(Boolean(profile.isFollowed), (state) => !state);
  const { actions } = useNotificationsContext();

  const onFormSubmit = async (data: FormData) => {
    data.append("userId", profile.id);
    addOptimisticIsSubscribed();

    try {
      if (profile.isFollowed) {
        await unFollow(data);
        return;
      }

      await follow(data);
    } catch {
      actions.error("Failed to update subscription");
    }
  };

  return (
    <div
      className={combineClassNames(
        className,
        "flex flex-col gap-10 md:flex-row",
      )}
    >
      <AvatarUploader
        username={profile.username}
        firstName={profile.firstName ?? ""}
        lastName={profile.lastName ?? ""}
        imageUrl={profile.imageUrl ?? ""}
        className="h-40 w-auto rounded-3xl md:w-40"
        isDisabled
      />

      <form className="flex flex-1 flex-col gap-4" action={onFormSubmit}>
        <InputWithLabel value={profile.username} disabled aria-disabled />

        <InputWithLabel
          placeholder="First Name"
          value={profile.firstName ?? ""}
          disabled
          aria-disabled
        />
        <InputWithLabel
          placeholder="Last Name"
          value={profile.lastName ?? ""}
          disabled
          aria-disabled
        />

        {user && optimisticIsSubscribed && (
          <button className="rounded-md border-2 border-primary-500 bg-transparent py-2 text-lg font-medium tracking-wider text-primary-500 transition hover:bg-primary-500 hover:text-white">
            Unsubscribe
          </button>
        )}

        {user && !optimisticIsSubscribed && (
          <button className="rounded-md border-2 border-primary-500 bg-primary-500 py-2 text-lg font-medium tracking-wider text-white transition hover:bg-transparent hover:text-primary-500">
            Follow
          </button>
        )}
      </form>
    </div>
  );
};

export { ProfileDataViewer };
