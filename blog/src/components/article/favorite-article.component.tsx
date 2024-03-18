import Image from "next/image";
import moment from "moment";
import { ArticleResponse } from "@/actions/articles/articles.action";

type FavoriteArticleProps = {
  article: ArticleResponse;
};

const FavoriteArticle: React.FC<FavoriteArticleProps> = ({ article }) => {
  return (
    <article className="flex h-32 items-center overflow-hidden rounded-md bg-white shadow-sm shadow-black-700/10">
      <Image
        src={article.featured_image_url}
        alt={article.title}
        width={200}
        height={100}
        className="h-full w-32 object-cover"
      />
      <main className="flex w-full flex-col gap-1 px-5 py-4">
        <header className="font-semibold">{article.title}</header>

        <footer className="flex flex-wrap items-center justify-between text-sm text-gray-500 ">
          <span>{article.owner.username}</span>
          <span>{moment(article.created_at).format("DD/MM/YYYY")}</span>
        </footer>
      </main>
    </article>
  );
};

export { FavoriteArticle };
