"use client";
import { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { Icon } from "@/components/icon/icon.component";

type SearchProps = {
  className?: string;
  from: string;
  to: string;
};

const Search: React.FC<SearchProps> = ({ className, to, from }) => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const { width, opacity } = useSpring({
    width: isSearchActive ? to : from,
    opacity: isSearchActive ? 1 : 0,
  });

  return (
    <button
      className={`flex gap-2 rounded-md bg-lightGray-200 px-2 transition ${
        !isSearchActive ? "hover:bg-lightGray-100" : ""
      } ${className ?? ""}`}
      onClick={() => {
        // when search bar is shown, shouldn't trigger opening again
        if (!isSearchActive) {
          setIsSearchActive(true);
        }
      }}
    >
      <Icon name="search" />

      <animated.div
        className="box-border flex w-full items-center justify-end"
        style={{
          width,
          opacity,
          display: opacity.to((o) => (o === 0 ? "none" : "flex")),
        }}
      >
        <input
          type="text"
          className="w-full bg-transparent py-2 text-sm outline-none"
          spellCheck="false"
        ></input>
        <Icon
          name="close"
          className="cursor-pointer"
          onClick={() => setIsSearchActive(false)}
        />
      </animated.div>
    </button>
  );
};

export { Search };
