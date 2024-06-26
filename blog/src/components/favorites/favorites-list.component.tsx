"use client";

import { useEffect, useState } from "react";

import { getFavorites } from "@/actions/favorites/favorites.action";
import { FavoriteWithOwner } from "@/actions/favorites/favorites.types";

import { FavoriteArticle } from "../article/favorite-article.component";

const FavoritesList = () => {
  const [favorites, setFavorites] = useState<FavoriteWithOwner[]>([]);

  useEffect(() => {
    const loadFavorites = async () => {
      const favorites = await getFavorites();
      setFavorites(favorites);
    };

    loadFavorites();
  }, []);

  return favorites ? (
    <>
      {favorites.length > 0 && (
        <div className="mt-5 flex flex-col gap-5">
          {favorites.map((article) => (
            <FavoriteArticle key={article.id} article={article} />
          ))}
        </div>
      )}

      {favorites.length === 0 && (
        <div className="flex flex-grow items-center justify-center text-sm tracking-wider text-gray-500">
          <span>No favorites here yet...</span>
        </div>
      )}
    </>
  ) : (
    <div className="flex flex-grow items-center justify-center text-sm tracking-wider text-gray-500">
      <span>Error happened</span>
    </div>
  );
};

export { FavoritesList };
