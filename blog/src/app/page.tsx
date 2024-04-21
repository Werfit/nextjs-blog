"use client";

import { useEffect } from "react";

import { getArticles } from "@/actions/articles/articles.action";
import { ArticleWithOwner } from "@/actions/articles/articles.types";
import { Article } from "@/components/article/article.component";
import { LoadMoreButton } from "@/components/load-more-button/load-more-button.component";
import { Navigation } from "@/components/navigation/navigation.component";
import { Skeleton } from "@/components/skeleton/skeleton.component";
import { usePagination } from "@/hooks/use-pagination.hook";
import { useNotificationsContext } from "@/provider/notifications/notifications.hook";

const Home = () => {
  const { response, isLoading, error, loadNextPage } =
    usePagination<ArticleWithOwner>([], getArticles);
  const { actions } = useNotificationsContext();

  useEffect(() => {
    if (error) {
      actions.error(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <main className="grid-container mx-auto gap-10 pb-10">
      <Navigation className="container mx-auto" />

      <div className="container !col-start-[full-screen] col-end-[full-screen] mx-auto grid grid-cols-1 gap-10 px-10 sm:px-0 md:grid-cols-2 xl:grid-cols-3">
        {response.data.length === 0 && !isLoading && (
          <p className="col-span-full text-center text-sm tracking-wider text-blueGray-500">
            No articles yet...
          </p>
        )}
        {response.data.map((article) => (
          <Article key={article.id} article={article} />
        ))}
        {isLoading &&
          new Array(response.metadata.limit)
            .fill(0)
            .map((_, index) => <Skeleton key={index} className="" />)}
      </div>

      {response.metadata.total >
        (response.metadata.page + 1) * response.metadata.limit && (
        <div className="container !col-start-[full-screen] col-end-[full-screen] mx-auto px-10 sm:px-0">
          <LoadMoreButton
            className="w-full"
            isLoading={isLoading}
            onClick={() => loadNextPage()}
          />
        </div>
      )}
    </main>
  );
};

export default Home;
