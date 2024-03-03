"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

type PortalProps = {
  children: React.ReactNode;
  targetId: string;
};

const Portal: React.FC<PortalProps> = ({ children, targetId }) => {
  const [element, setElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const element = document.getElementById(targetId);

    if (!element) {
      console.warn(
        "Portal element was not found, rendering into document.body",
      );
    }
    setElement(element);
  }, [targetId, setElement]);

  return element && createPortal(children, element);
};

export { Portal };
