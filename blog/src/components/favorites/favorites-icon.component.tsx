"use client";
import { useState } from "react";
import { useTransition } from "@react-spring/web";
import { Icon } from "@/components/icon/icon.component";
import { Portal } from "@/components/portal/portal.component";
import { Favorites } from "./favorites.component";

type FavoriteIconProps = {
  onClick?: () => Promise<void>;
  children?: React.ReactNode;
};

const FavoritesIcon: React.FC<FavoriteIconProps> = ({ children, onClick }) => {
  const [showFavorites, setShowFavorites] = useState(false);

  const transitions = useTransition(showFavorites ? [1] : [], {
    from: { opacity: 0, right: "-100%" },
    enter: { opacity: 1, right: "0%" },
    leave: { opacity: 0, right: "-100%" },
  });

  return (
    <>
      <button
        className="text-black rounded-md bg-lightGray-200 px-2 transition hover:bg-lightGray-100"
        onClick={() => {
          onClick?.();
          setShowFavorites(true);
        }}
      >
        <Icon name="bookmark" />
      </button>

      {transitions((style) => (
        <Portal targetId="overlays">
          {
            <Favorites style={style} onClose={() => setShowFavorites(false)}>
              {children}
            </Favorites>
          }
        </Portal>
      ))}
    </>
  );
};

export { FavoritesIcon };
