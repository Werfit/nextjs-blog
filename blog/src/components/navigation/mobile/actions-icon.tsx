"use client";

import { Icon } from "@/components/icon/icon.component";
import { useState } from "react";
import { OverlayActions } from "./overlay-actions.component";
import { Portal } from "@/components/portal/portal.component";

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

      {isMenuOpened && (
        <Portal targetId="overlays">
          <OverlayActions onClose={() => setMenuOpened(false)} />
        </Portal>
      )}
    </>
  );
};

export { ActionsIcon };
