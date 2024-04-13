"use client";
import { useOptimistic } from "react";
import { toast } from "react-toastify";

import {
  follow,
  unFollow,
  UserWithFollowingStatus,
} from "@/actions/user/followers.action";

type UserProps = {
  user: UserWithFollowingStatus;
};

const User: React.FC<UserProps> = ({ user }) => {
  const [optimisticIsSubscribed, addOptimisticIsSubscribed] = useOptimistic<
    boolean,
    void
  >(!!user._count.subscribers, (state) => !state);

  return (
    <div className="flex flex-col items-center justify-between gap-2 rounded-md bg-white px-6 py-4 shadow-sm shadow-black-700/10 sm:flex-row sm:gap-0">
      {user.username}

      <form
        action={async (data: FormData) => {
          data.append("userId", user.id);
          addOptimisticIsSubscribed();

          try {
            if (user._count.subscribers) {
              await unFollow(data);
              return;
            }

            await follow(data);
          } catch {
            toast.error("Failed to update subscription status");
          }
        }}
      >
        {!optimisticIsSubscribed ? (
          <button className="w-full rounded-md bg-primary-500 px-4 py-2 text-white transition hover:bg-primary-400 sm:w-auto">
            Follow
          </button>
        ) : (
          <button className="w-full rounded-md border-2 border-primary-500 px-4 py-2 text-primary-500 transition hover:bg-gray-50 sm:w-auto">
            Unsubscribe
          </button>
        )}
      </form>
    </div>
  );
};

export { User };
