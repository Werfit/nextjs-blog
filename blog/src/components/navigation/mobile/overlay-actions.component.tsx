"use client";
import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Icon } from "../../icon/icon.component";
import Link from "next/link";
import { Search } from "@/components/search/search.component";
import { FavoritesIcon } from "@/components/favorites/favorites-icon.component";

import { AuthButtons } from "../auth-buttons.component";

type OverlayActionsProps = {
  onClose: () => void;
};

const OverlayActions: React.FC<OverlayActionsProps> = ({ onClose }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ opacity: 1, right: 0 });
  }, [controls]);

  const closeNavigation = async () => {
    await controls.start({
      opacity: 0,
      right: "100%",
    });
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, right: "100%" }}
      animate={controls}
      exit={{ opacity: 0, right: "100%" }}
      className="grid-container fixed right-full top-0 flex h-full w-full flex-col bg-white py-6"
    >
      <div className="text-right">
        <button onClick={closeNavigation} className="text-3xl">
          <Icon name="close" />
        </button>

        <main className="flex h-full flex-col items-center justify-center gap-4">
          <Link
            href="/"
            className="transition hover:text-black-500"
            onClick={closeNavigation}
          >
            Home
          </Link>
          <Link
            href="#"
            className="transition hover:text-black-500"
            onClick={closeNavigation}
          >
            Connect
          </Link>
          <Link
            href="/article/create"
            className="w-full rounded-md bg-primary-500 px-4 py-2 text-center font-medium tracking-widest text-white transition hover:bg-primary-400"
            onClick={closeNavigation}
          >
            Write
          </Link>
          <Search className="w-full" from="0%" to="100%" />
          <div className="flex items-center justify-center gap-2">
            <FavoritesIcon onClick={closeNavigation}>
              {/* <FavoritesList /> */}
            </FavoritesIcon>
            <AuthButtons />
          </div>
        </main>
      </div>
    </motion.div>
  );
};

export { OverlayActions };
