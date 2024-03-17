"use client";
import { motion } from "framer-motion";
import { Icon } from "../../icon/icon.component";
import Link from "next/link";
import { Search } from "@/components/search/search-icon.component";
import { FavoritesIcon } from "@/components/favorites/favorites-icon.component";

import { AuthButtons } from "../auth-buttons.component";
import { useAnimationOnInitAndCleanup } from "@/hooks/use-animation-on-init-cleanup.hook";
import { ANIMATION_CONFIG } from "@/constants/animation.constants";

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
          <Link
            href="/"
            className="transition hover:text-black-500"
            onClick={onClose}
          >
            Home
          </Link>
          <Link
            href="#"
            className="transition hover:text-black-500"
            onClick={onClose}
          >
            Connect
          </Link>
          <Link
            href="/article/create"
            className="w-full rounded-md bg-primary-500 px-4 py-2 text-center font-medium tracking-widest text-white transition hover:bg-primary-400"
            onClick={onClose}
          >
            Write
          </Link>
          <Search className="w-full" from="0%" to="100%" />
          <div className="flex items-center justify-center gap-2">
            <FavoritesIcon>{favoritesList}</FavoritesIcon>
            <AuthButtons />
          </div>
        </main>
      </div>
    </motion.div>
  );
};

export { OverlayActions };
