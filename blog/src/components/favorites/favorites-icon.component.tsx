"use client";
import { useState } from "react";
import { useTransition } from "@react-spring/web";
import { Icon } from "@/components/icon/icon.component";
import { Portal } from "@/components/portal/portal.component";
import { Favorites } from "@/components/favorites/favorites.component";

const FavoritesIcon = () => {
  const [showFavorites, setShowFavorites] = useState(false);

  const transitions = useTransition(showFavorites ? [1] : [], {
    from: { opacity: 0, right: "-100%" },
    enter: { opacity: 1, right: "0%" },
    leave: { opacity: 0, right: "-100%" },
  });

  return (
    <>
      <button
        className="bg-lightGray-200 rounded-md text-black px-2 transition hover:bg-lightGray-100"
        onClick={() => {
          setShowFavorites(true);
        }}
      >
        <Icon name="bookmark" />
      </button>

      {transitions((style) => (
        <Portal targetId="overlays">
          <Favorites style={style} onClose={() => setShowFavorites(false)} />
        </Portal>
      ))}
    </>
  );
};

export { FavoritesIcon };
