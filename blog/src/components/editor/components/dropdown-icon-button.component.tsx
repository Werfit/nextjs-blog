"use client";

import { useState, MouseEvent } from "react";
import { useTransition, animated } from "@react-spring/web";
import { Icon } from "../../icon/icon.component";
import { DropdownAction } from "../common";

type DropdownIconButtonProps = {
  name: string;
  actions: DropdownAction[];
  className?: string;
  // eslint-disable-next-line no-unused-vars
  onClick: (level: DropdownAction["level"]) => void;
};

const DropdownIconButton: React.FC<DropdownIconButtonProps> = ({
  name,
  actions,
  onClick,
  className,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const transitions = useTransition(isVisible ? [1] : [], {
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

  const handler = () => setIsVisible(false);

  const showDropdown = (event: MouseEvent<HTMLDivElement>) => {
    setIsVisible(true);
    window.addEventListener("click", handler);
    event.stopPropagation();
  };

  const hideDropdown = (event: MouseEvent<HTMLButtonElement>) => {
    window.removeEventListener("click", handler);
    setIsVisible(false);
    event.stopPropagation();
  };

  const toggleDropdown = (
    event: MouseEvent<HTMLDivElement | HTMLButtonElement>
  ) => {
    if (isVisible) {
      hideDropdown(event as MouseEvent<HTMLButtonElement>);
      return;
    }

    showDropdown(event as MouseEvent<HTMLDivElement>);
  };

  return (
    <div
      className={`relative cursor-pointer ${className ?? ""}`}
      onClick={toggleDropdown}
    >
      <Icon name={name} />

      {transitions((style) => (
        <>
          <animated.div
            className="absolute bg-white rounded-md overflow-hidden shadow-md shadow-black-700/10 left-1/2 -translate-x-1/2 z-10 min-w-24 -translate-y-full -top-1"
            style={style}
          >
            {actions.map((action, index) => (
              <button
                key={index}
                type="button"
                className="py-2 px-4 hover:bg-gray-100 transition w-full"
                onClick={(event) => {
                  onClick(action.level);
                  hideDropdown(event);
                }}
              >
                {action.title}
              </button>
            ))}
          </animated.div>
        </>
      ))}
    </div>
  );
};

export { DropdownIconButton as DropdownIcon };
