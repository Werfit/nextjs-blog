import { getFavorites } from "@/actions/favorites/favorites.action";
import { FavoriteArticle } from "../article/favorite-article.component";

const FavoritesList = async () => {
  const favorites = await getFavorites();

  return favorites.data ? (
    <>
      {favorites.data.length > 0 && (
        <div className="mt-5 flex flex-col gap-5">
          {favorites.data.map((article) => (
            <FavoriteArticle key={article.id} article={article} />
          ))}
        </div>
      )}

      {favorites.data.length === 0 && (
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
