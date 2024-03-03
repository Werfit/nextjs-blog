"use client";
import { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { Icon } from "@/components/icon/icon.component";

const Search = () => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const { width, opacity } = useSpring({
    width: isSearchActive ? "150px" : "0px",
    opacity: isSearchActive ? 1 : 0,
  });

  return (
    <button
      className={`bg-lightGray-200 rounded-md px-2 transition flex gap-2 ${
        !isSearchActive ? "hover:bg-lightGray-100" : ""
      }`}
      onClick={() => {
        // when search bar is shown, shouldn't trigger opening again
        if (!isSearchActive) {
          setIsSearchActive(true);
        }
      }}
    >
      <Icon name="search" />

      <animated.div
        className="flex items-center justify-end box-border"
        style={{
          width,
          opacity,
          display: opacity.to((o) => (o === 0 ? "none" : "flex")),
        }}
      >
        <input
          type="text"
          className="py-2 bg-transparent outline-none text-sm w-full"
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
