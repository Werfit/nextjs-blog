"use client";

import { useRouter } from "next/navigation";
import { ArticleResponse } from "@/actions/articles/articles.action";
import Image from "next/image";

type ArticleProps = {
  article: ArticleResponse;
};

const ARTICLE_PREVIEW_LENGTH = 300;

const Article: React.FC<ArticleProps> = ({ article }) => {
  const router = useRouter();

  return (
    <article
      className="bg-white rounded-md shadow-md shadow-black-700/10 hover:bg-gray-50 transition cursor-pointer overflow-clip"
      onClick={() => router.push(`/article/${article.id}`)}
    >
      <header>
        <Image
          className="w-full h-44 object-cover"
          width={400}
          height={200}
          src={article.featured_image_url}
          alt={article.title}
        />
      </header>

      <main className="flex flex-col gap-4 px-8 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl">{article.title}</h2>

          <p className="font-mono font-semibold text-black-700 tracking-wider">
            {article.owner.username}
          </p>
        </div>
        <div className="flex text-sm my-2 text-gray-500 ">
          <p className="flex-1 text-pretty">
            {article.content.substring(0, ARTICLE_PREVIEW_LENGTH).trim()}...
          </p>
        </div>
      </main>
    </article>
  );
};

export { Article };
