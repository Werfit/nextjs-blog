"use client";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

import { Icon } from "@/components/icon/icon.component";
import { Portal } from "@/components/portal/portal.component";

import { Favorites } from "./favorites.component";

const FavoritesIcon = () => {
  const [showFavorites, setShowFavorites] = useState(false);

  return (
    <>
      <button
        className="text-black rounded-md bg-lightGray-200 px-2 transition hover:bg-lightGray-100"
        onClick={() => {
          setShowFavorites(true);
        }}
      >
        <Icon name="bookmark" />
      </button>

      <Portal targetId="overlays">
        <AnimatePresence>
          {showFavorites && (
            <Favorites onClose={() => setShowFavorites(false)} />
          )}
        </AnimatePresence>
      </Portal>
    </>
  );
};

export { FavoritesIcon };
