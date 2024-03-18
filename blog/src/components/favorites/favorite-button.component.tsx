"use client";

import { useOptimistic } from "react";
import { Icon } from "../icon/icon.component";
import { toggleFavorite } from "@/actions/favorites/favorites.action";

type FavoriteButtonProps = {
  articleId: string;
  isActive: boolean;
};

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  articleId,
  isActive,
}) => {
  const [optimisticIsInFavorites, addOptimisticIsInFavorites] = useOptimistic<
    boolean,
    { isFavorite: boolean }
  >(isActive, (_, { isFavorite }) => isFavorite);

  return (
    <form
      action={async (data: FormData) => {
        data.append("articleId", articleId);

        const isFavorite = data.get("isFavorite") === "true";
        addOptimisticIsInFavorites({ isFavorite: !isFavorite });
        await toggleFavorite(data);
      }}
    >
      <input
        type="hidden"
        name="isFavorite"
        value={String(optimisticIsInFavorites)}
      />
      <button className="fill-black-700">
        <Icon
          name="favorite"
          className="text-4xl"
          filled={optimisticIsInFavorites}
        />
      </button>
    </form>
  );
};

export { FavoriteButton };
