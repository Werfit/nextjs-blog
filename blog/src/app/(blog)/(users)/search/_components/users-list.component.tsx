"use client";

import { AnimatePresence, motion } from "framer-motion";

import { UserResponse } from "@/actions/common.types";
import { UserWithCurrentUserSubscriber } from "@/actions/user/followers/followers.types";
import { User } from "@/app/(blog)/(users)/search/_components/user.component";

type UserListProps = {
  users: UserWithCurrentUserSubscriber[] | UserResponse[];
};

const UsersList: React.FC<UserListProps> = ({ users }) => {
  return (
    <AnimatePresence>
      <motion.div
        className="flex flex-col gap-2"
        initial="closed"
        animate={users.length > 0 ? "open" : "closed"}
        variants={{
          open: {
            transition: { staggerChildren: 0.07, delayChildren: 0.2 },
          },
          closed: {
            transition: { staggerChildren: 0.05, staggerDirection: -1 },
          },
        }}
      >
        {users.map((user) => (
          <User key={user.id} user={user} />
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export { UsersList };
