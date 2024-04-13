import "@/assets/styles/article.css";

import moment from "moment";
import { Source_Code_Pro } from "next/font/google";
import Image from "next/image";

import { getArticleById } from "@/actions/articles/articles.action";
import { FavoriteButton } from "@/components/favorites/favorite-button.component";
import { combineClassNames } from "@/utils/class-name.util";
import { calculateTimeToRead } from "@/utils/reading-time.util";

type ArticleProps = { params: { id: string } };

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-source-code-pro",
});

const Article: React.FC<ArticleProps> = async ({ params }) => {
  const { data } = await getArticleById(params.id);

  return data ? (
    <article className="grid-container !col-start-[full-screen] col-end-[full-screen] -mt-10">
      <Image
        className="!col-start-[full-screen] !col-end-[full-screen] mb-6 h-96 w-full object-cover"
        src={data.featuredImageUrl}
        alt={data.title}
        width={1000}
        height={500}
      />
      <section className="mb-4 flex flex-col justify-between gap-2 md:flex-row md:items-center">
        <h1 className="w-full flex-1 text-3xl leading-6">{data.title}</h1>
        <div className="flex flex-col text-sm text-gray-500">
          <span>Author: {data.owner.username}</span>
          <span>Time to read: {calculateTimeToRead(data.content)} minutes</span>
        </div>
      </section>

      <section
        className={combineClassNames("article", sourceCodePro.variable)}
        dangerouslySetInnerHTML={{ __html: data.contentHtml }}
      ></section>

      <footer className="mt-6 flex items-center justify-between">
        {typeof data.isFavorite !== "undefined" && (
          <FavoriteButton articleId={data.id} isActive={data.isFavorite} />
        )}

        <div className="text-sm tracking-wider text-gray-500">
          Article was written:{" "}
          <span className="break-words font-semibold">
            {moment(data.createdAt).format("DD/MM/YYYY")}
          </span>
        </div>
      </footer>
    </article>
  ) : (
    <p>Not found!</p>
  );
};

export default Article;
