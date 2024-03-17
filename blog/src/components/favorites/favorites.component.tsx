"use client";
import { Icon } from "@/components/icon/icon.component";
import { motion } from "framer-motion";
import { ANIMATION_CONFIG } from "@/constants/animation.constants";
import { useAnimationOnInitAndCleanup } from "@/hooks/use-animation-on-init-cleanup.hook";

type FavoritesProps = {
  children?: React.ReactNode;
  onClose: () => void;
};

const Favorites: React.FC<FavoritesProps> = ({ children, onClose }) => {
  const { scope } = useAnimationOnInitAndCleanup<HTMLDivElement>({
    onEnter: async (scope, animate) => {
      await Promise.all([
        animate(scope.current, { opacity: 1 }, ANIMATION_CONFIG),
        animate("div", { right: "0%" }, ANIMATION_CONFIG),
      ]);
    },
    onExit: async (scope, animate) => {
      await Promise.all([
        animate("div", { right: "-100%" }, ANIMATION_CONFIG),
        animate(scope.current, { opacity: 0 }, ANIMATION_CONFIG),
      ]);
    },
  });

  return (
    <motion.aside
      className="fixed top-0 h-screen w-screen bg-black-900/10"
      initial={{ opacity: 0 }}
      ref={scope}
      onClick={onClose}
    >
      <motion.div
        className="absolute top-0 flex h-full w-full flex-col bg-gray-50 px-10 py-8 shadow-lg shadow-black-500/20 md:w-1/2 lg:w-1/3"
        initial={{ right: "-100%" }}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between">
          <h1 className="text-xl font-medium tracking-wider">Favorites</h1>
          <button onClick={onClose}>
            <Icon name="close" />{" "}
          </button>
        </header>

        {children}
      </motion.div>
    </motion.aside>
  );
};

export { Favorites };
