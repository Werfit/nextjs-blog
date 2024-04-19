"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { ANIMATION_CONFIG } from "@/constants/animation.constants";
import { useAnimationOnInitAndCleanup } from "@/hooks/use-animation-on-init-cleanup.hook";
import { combineClassNames } from "@/utils/class-name.util";

type ProfileDropdownProps = {
  onClose: () => void;
};

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ onClose }) => {
  const { scope } = useAnimationOnInitAndCleanup<HTMLDivElement>({
    onEnter: async (scope, animate) => {
      await animate(scope.current, { opacity: 1 }, ANIMATION_CONFIG);
    },
    onExit: async (scope, animate) => {
      await animate(scope.current, { opacity: 0 }, ANIMATION_CONFIG);
    },
  });
  const { data } = useSession();

  const [positionClassNames, setPositionClassNames] = useState(
    "left-1/2 -translate-x-1/2",
  );

  useEffect(() => {
    if (!scope.current) {
      return;
    }

    const position = scope.current.getBoundingClientRect();

    // changes dropdown position if it can't fit in the screen being centered relatively the profile button
    if (position.left + position.width > window.innerWidth) {
      setPositionClassNames("right-0");
    }
  }, [scope]);

  return (
    <>
      {/* Clickable area for hiding dropdown if anything else was clicked */}
      <div
        className="fixed left-0 top-0 h-screen w-screen"
        onClick={onClose}
      ></div>

      <motion.div
        className={combineClassNames(
          "dropdown absolute top-full flex min-w-32 translate-y-2 flex-col overflow-hidden rounded-md bg-white text-center tracking-wider shadow-md",
          positionClassNames,
        )}
        ref={scope}
        initial={{ opacity: 0 }}
      >
        <Link
          href={`/user/${data?.user.id}`}
          className="block px-4 py-2 transition hover:bg-lightGray-50"
        >
          Profile
        </Link>
        <button
          className="w-full px-4 py-2 transition hover:bg-lightGray-50"
          onClick={() =>
            signOut({
              // TODO: maybe will be needed in future
              // redirect: false,
            })
          }
        >
          Logout
        </button>
      </motion.div>
    </>
  );
};

export { ProfileDropdown };
