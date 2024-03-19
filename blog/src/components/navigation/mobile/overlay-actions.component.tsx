"use client";
import { motion } from "framer-motion";
import { Icon } from "../../icon/icon.component";
import { useAnimationOnInitAndCleanup } from "@/hooks/use-animation-on-init-cleanup.hook";
import { ANIMATION_CONFIG } from "@/constants/animation.constants";
import { NavigationActions } from "../navigation-actions/navigation-actions.component";
import { AuthenticatedActions } from "./authenticated-actions.component";
import { PublicActions } from "./public-actions.component";

type OverlayActionsProps = {
  favoritesList: React.ReactNode;
  onClose: () => void;
};

const OverlayActions: React.FC<OverlayActionsProps> = ({
  onClose,
  favoritesList,
}) => {
  const { scope } = useAnimationOnInitAndCleanup<HTMLDivElement>({
    onEnter: async (scope, animate) => {
      await animate(scope.current, { opacity: 1, right: 0 }, ANIMATION_CONFIG);
    },
    onExit: async (scope, animate) => {
      await animate(
        scope.current,
        { opacity: 0, right: "100%" },
        ANIMATION_CONFIG,
      );
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, right: "100%" }}
      ref={scope}
      className="grid-container fixed right-full top-0 flex h-full w-full flex-col bg-white py-6"
    >
      <div className="text-right">
        <button onClick={onClose} className="text-3xl">
          <Icon name="close" />
        </button>

        <main className="flex h-full flex-col items-center justify-center gap-4">
          <NavigationActions
            authenticatedChildren={
              <AuthenticatedActions onClose={onClose}>
                {favoritesList}
              </AuthenticatedActions>
            }
            publicChildren={<PublicActions />}
          />
        </main>
      </div>
    </motion.div>
  );
};

export { OverlayActions };
