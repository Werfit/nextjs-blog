"use client";

import { useEffect, useState } from "react";

import { getUserArticles } from "@/actions/articles/articles.action";
import { Article } from "@/components/article/article.component";

import { LoadMoreButton } from "./_components/load-more-button.component";

type ArticleProps = {
  params: {
    id: string;
  };
};

const Articles: React.FC<ArticleProps> = ({ params }) => {
  const [articles, setArticles] = useState<Awaited<
    ReturnType<typeof getUserArticles>
  > | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const isLoadMoreButtonVisible =
    articles?.metadata &&
    articles.metadata.total >
      (articles.metadata.page + 1) * articles.metadata.limit;

  const getArticles = async () => {
    setIsLoading(true);
    try {
      const page = articles?.metadata?.page ? articles.metadata.page + 1 : 0;

      const data = await getUserArticles(
        params.id,
        articles?.metadata.limit,
        page,
      );
      setArticles(data);
    } catch (err) {
      const error = err as Error;
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getArticles();
  }, [params.id]);

  return (
    <div className="col-span-3 flex w-full flex-col gap-6">
      {[
        ...(articles?.data ?? []),
        ...(articles?.data ?? []),
        ...(articles?.data ?? []),
        ...(articles?.data ?? []),
        ...(articles?.data ?? []),
        ...(articles?.data ?? []),
      ].map((article, index) => (
        <Article key={index} article={article} />
      ))}

      {isLoadMoreButtonVisible && (
        <LoadMoreButton
          isLoading={isLoading}
          onClick={() => setIsLoading(true)}
        />
      )}
    </div>
  );
};

export default Articles;
