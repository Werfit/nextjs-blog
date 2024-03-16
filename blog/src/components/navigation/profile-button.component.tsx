"use client";

import { useState } from "react";
import Link from "next/link";
import { useTransition, animated } from "@react-spring/web";
import { signOut } from "next-auth/react";
import { User } from "@/types/user.type";
import { Icon } from "@/components/icon/icon.component";

type ProfileButtonProps = {
  user: User;
  className?: string;
};

const ProfileButton: React.FC<ProfileButtonProps> = ({ className }) => {
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
    <div className={`relative ${className ?? ""}`}>
      <button
        className="rounded-md border-2 border-lightGray-100 px-2 transition hover:bg-lightGray-100/50"
        onClick={() => setIsDropdownVisible(true)}
      >
        <Icon name="account_circle" />
      </button>

      {transitions((style) => (
        <>
          {/* Can't use portals for that, because it will need precise location for showing dropdown list */}
          <div
            className="fixed left-0 top-0 h-screen w-screen"
            onClick={() => setIsDropdownVisible(false)}
          ></div>
          <animated.div
            className="dropdown absolute left-1/2 top-full flex min-w-32 -translate-x-1/2 translate-y-2 flex-col overflow-hidden rounded-md bg-white text-center tracking-wider shadow-md"
            style={style}
          >
            <Link
              href="#"
              className="block px-4 py-2 transition hover:bg-lightGray-50"
            >
              Profile
            </Link>
            <button
              className="w-full px-4 py-2 transition hover:bg-lightGray-50"
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
