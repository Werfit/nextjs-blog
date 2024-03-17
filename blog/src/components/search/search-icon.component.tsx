"use client";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Icon } from "@/components/icon/icon.component";
import { combineClassNames } from "@/utils/class-name.util";
import { SlidingInput } from "./sliding-input.component";

type SearchProps = {
  className?: string;
  from: string;
  to: string;
};

// TODO: Add behavior similar to CMD+K

const Search: React.FC<SearchProps> = ({ className, to, from }) => {
  const [isSearchActive, setIsSearchActive] = useState(false);

  return (
    <button
      className={combineClassNames(
        `flex gap-2 rounded-md bg-lightGray-200 px-2 transition`,
        !isSearchActive ? "hover:bg-lightGray-100" : "",
        className,
      )}
      onClick={() => {
        // when search bar is shown, shouldn't trigger opening again
        if (!isSearchActive) {
          setIsSearchActive(true);
        }
      }}
    >
      <Icon name="search" />

      <AnimatePresence>
        {isSearchActive && (
          <SlidingInput
            from={from}
            to={to}
            onClose={() => setIsSearchActive(false)}
          />
        )}
      </AnimatePresence>
    </button>
  );
};

export { Search };
