"use client";

import { AnimatePresence } from "framer-motion";
import { useState } from "react";

import { Icon } from "@/components/icon/icon.component";
import { Portal } from "@/components/portal/portal.component";

import { OverlayActions } from "./overlay-actions.component";

type ActionsIconProps = {
  className?: string;
};

const ActionsIcon: React.FC<ActionsIconProps> = ({ className }) => {
  const [isMenuOpened, setMenuOpened] = useState(false);

  return (
    <>
      <Icon
        className={className}
        name="menu"
        onClick={() => setMenuOpened(true)}
      />

      <Portal targetId="overlays">
        <AnimatePresence>
          {isMenuOpened && (
            <OverlayActions onClose={() => setMenuOpened(false)} />
          )}
        </AnimatePresence>
      </Portal>
    </>
  );
};

export { ActionsIcon };
