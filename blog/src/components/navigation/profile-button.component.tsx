"use client";

import { useState } from "react";
import Link from "next/link";
import { useTransition, animated } from "@react-spring/web";
import { signOut } from "next-auth/react";
import { User } from "@/types/user.type";
import { Icon } from "@/components/icon/icon.component";

type ProfileButtonProps = {
  user: User;
};

const ProfileButton: React.FC<ProfileButtonProps> = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const transitions = useTransition(isDropdownVisible ? [1] : [], {
    from: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
    },
    leave: {
      opacity: 0,
    },
  });

  return (
    <div className="relative">
      <button
        className="border-2 border-lightGray-100 transition px-2 rounded-md hover:bg-lightGray-100/50"
        onClick={() => setIsDropdownVisible(true)}
      >
        <Icon name="account_circle" />
      </button>

      {transitions((style) => (
        <>
          {/* Can't use portals for that, because it will need precise location for showing dropdown list */}
          <div
            className="fixed top-0 left-0 w-screen h-screen"
            onClick={() => setIsDropdownVisible(false)}
          ></div>
          <animated.div
            className="dropdown absolute shadow-md min-w-32 rounded-md left-1/2 -translate-x-1/2 tracking-wider overflow-hidden flex flex-col text-center top-full translate-y-2 bg-white"
            style={style}
          >
            <Link
              href="#"
              className="block py-2 px-4 hover:bg-lightGray-50 transition"
            >
              Profile
            </Link>
            <button
              className="py-2 px-4 hover:bg-lightGray-50 transition w-full"
              onClick={() =>
                signOut({
                  redirect: false,
                })
              }
            >
              Logout
            </button>
          </animated.div>
        </>
      ))}
    </div>
  );
};

export { ProfileButton };
