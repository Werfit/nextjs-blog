"use client";

import { useOptimistic } from "react";

import { follow, unFollow } from "@/actions/user/followers/followers.action";
import { UserWithCurrentUserSubscriber } from "@/actions/user/followers/followers.types";
import { useNotificationsContext } from "@/provider/notifications/notifications.hook";

type SubscriptionButtonProps = {
  user: UserWithCurrentUserSubscriber;
};

const SubscriptionButton: React.FC<SubscriptionButtonProps> = ({ user }) => {
  const [optimisticIsSubscribed, addOptimisticIsSubscribed] = useOptimistic<
    boolean,
    void
  >(user.isFollowed, (state) => !state);
  const { actions } = useNotificationsContext();

  return (
    <form
      action={async (data: FormData) => {
        data.append("userId", user.id);
        addOptimisticIsSubscribed();

        try {
          if (user.isFollowed) {
            await unFollow(data);
            return;
          }

          await follow(data);
        } catch {
          actions.error("Failed to update subscription status");
        }
      }}
    >
      {!optimisticIsSubscribed ? (
        <button
          className="w-full rounded-md bg-primary-500 px-4 py-2 text-white transition hover:bg-primary-400 sm:w-auto"
          onClick={(e) => e.stopPropagation()}
        >
          Follow
        </button>
      ) : (
        <button
          className="w-full rounded-md border-2 border-primary-500 px-4 py-2 text-primary-500 transition hover:bg-gray-50 sm:w-auto"
          onClick={(e) => e.stopPropagation()}
        >
          Unsubscribe
        </button>
      )}
    </form>
  );
};

export { SubscriptionButton };
