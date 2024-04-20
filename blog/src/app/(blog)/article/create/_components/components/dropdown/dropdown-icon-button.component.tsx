"use client";

import { AnimatePresence } from "framer-motion";
import { MouseEvent, useState } from "react";

import { Icon } from "../../../../../../../components/icon/icon.component";
import { DropdownAction } from "../../common";
import { ActionsList } from "./actions-list.component";

type DropdownIconButtonProps = {
  name: string;
  actions: DropdownAction[];
  className?: string;
  onClick: (level: DropdownAction["level"]) => void;
};

const DropdownIconButton: React.FC<DropdownIconButtonProps> = ({
  name,
  actions,
  onClick,
  className,
}) => {
  const [isVisible, setIsVisible] = useState(false);

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
    event: MouseEvent<HTMLDivElement | HTMLButtonElement>,
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

      <AnimatePresence>
        {isVisible && (
          <ActionsList
            onClick={(event, level) => {
              onClick(level);
              hideDropdown(event);
            }}
            actions={actions}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export { DropdownIconButton as DropdownIcon };
