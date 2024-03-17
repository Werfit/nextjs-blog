"use client";

import { MouseEvent } from "react";
import { motion } from "framer-motion";
import { DropdownAction } from "../../common";
import { useAnimationOnInitAndCleanup } from "@/hooks/use-animation-on-init-cleanup.hook";
import { ANIMATION_CONFIG } from "@/constants/animation.constants";

type ActionsListProps = {
  onClick: (
    event: MouseEvent<HTMLButtonElement>,
    level: DropdownAction["level"],
  ) => void;
  actions: DropdownAction[];
};

const ActionsList: React.FC<ActionsListProps> = ({ actions, onClick }) => {
  const { scope } = useAnimationOnInitAndCleanup<HTMLDivElement>({
    onEnter: async (scope, animate) => {
      await animate(scope.current, { opacity: 1 }, ANIMATION_CONFIG);
    },
    onExit: async (scope, animate) => {
      await animate(scope.current, { opacity: 0 }, ANIMATION_CONFIG);
    },
  });

  return (
    <motion.div
      className="absolute -top-1 left-1/2 z-10 min-w-24 -translate-x-1/2 -translate-y-full overflow-hidden rounded-md bg-white shadow-md shadow-black-700/10"
      ref={scope}
      initial={{ opacity: 0 }}
    >
      {actions.map((action, index) => (
        <button
          key={index}
          type="button"
          className="w-full px-4 py-2 transition hover:bg-gray-100"
          onClick={(event) => {
            onClick(event, action.level);
          }}
        >
          {action.title}
        </button>
      ))}
    </motion.div>
  );
};

export { ActionsList };
