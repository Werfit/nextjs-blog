"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { ArticleWithOwner } from "@/actions/articles/articles.action";

type ArticleProps = {
  article: ArticleWithOwner;
};

const ARTICLE_PREVIEW_LENGTH = 300;

const Article: React.FC<ArticleProps> = ({ article }) => {
  const router = useRouter();

  return (
    <article
      className="cursor-pointer overflow-clip rounded-md bg-white shadow-md shadow-black-700/10 transition hover:bg-gray-50"
      onClick={() => router.push(`/article/${article.id}`)}
    >
      <header>
        <Image
          className="h-44 w-full object-cover"
          width={400}
          height={200}
          src={article.featuredImageUrl}
          alt={article.title}
        />
      </header>

      <main className="flex flex-col gap-4 px-8 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl">{article.title}</h2>

          <p className="font-mono font-semibold tracking-wider text-black-700">
            {article.owner.username}
          </p>
        </div>
        <div className="my-2 flex text-sm text-gray-500 ">
          <p className="flex-1 text-pretty">
            {article.content.substring(0, ARTICLE_PREVIEW_LENGTH).trim()}...
          </p>
        </div>
      </main>
    </article>
  );
};

export { Article };
