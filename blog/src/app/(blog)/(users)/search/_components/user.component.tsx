"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { UserResponse } from "@/actions/common.types";
import { UserWithCurrentUserSubscriber } from "@/actions/user/followers/followers.types";

import { SubscriptionButton } from "./subscription-button.component";

type UserProps = {
  user: UserResponse | UserWithCurrentUserSubscriber;
};

const User: React.FC<UserProps> = ({ user }) => {
  const router = useRouter();
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";

  return (
    <motion.div
      variants={{
        open: {
          y: 0,
          opacity: 1,
          transition: {
            y: { stiffness: 1000, velocity: -100 },
          },
        },
        closed: {
          y: 50,
          opacity: 0,
          transition: {
            y: { stiffness: 1000 },
          },
        },
      }}
      className="flex cursor-pointer flex-col items-center justify-between gap-2 rounded-md bg-white px-6 py-4 shadow-sm shadow-black-700/10 transition-colors hover:bg-lightGray-50 sm:flex-row sm:gap-0"
      onClick={() => router.push(`/user/${user.id}`)}
    >
      {user.username}

      {isAuthenticated && (
        <SubscriptionButton user={user as UserWithCurrentUserSubscriber} />
      )}
    </motion.div>
  );
};

export { User };
