"use client";

import { useState } from "react";
import { User } from "@/types/user.type";
import { Icon } from "@/components/icon/icon.component";
import { AnimatePresence } from "framer-motion";
import { ProfileDropdown } from "./dropdown.component";
import { combineClassNames } from "@/utils/class-name.util";

type ProfileIconButtonProps = {
  user: User;
  className?: string;
};

const ProfileIconButton: React.FC<ProfileIconButtonProps> = ({ className }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  return (
    <div className={combineClassNames("relative", className)}>
      <button
        className="rounded-md border-2 border-lightGray-100 px-2 transition hover:bg-lightGray-100/50"
        onClick={() => setIsDropdownVisible(true)}
      >
        <Icon name="account_circle" />
      </button>

      <AnimatePresence>
        {isDropdownVisible && (
          <ProfileDropdown onClose={() => setIsDropdownVisible(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export { ProfileIconButton };
