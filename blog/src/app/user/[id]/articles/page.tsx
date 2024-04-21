"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

import { getUserArticles } from "@/actions/articles/articles.action";
import { Article } from "@/components/article/article.component";
import { Spinner } from "@/components/spinner/spinner.component";
import { usePagination } from "@/hooks/use-pagination.hook";
import { useNotificationsContext } from "@/provider/notifications/notifications.hook";

import { LoadMoreButton } from "../../../../components/load-more-button/load-more-button.component";

type ArticleProps = {
  params: {
    id: string;
  };
};

const Articles: React.FC<ArticleProps> = ({ params }) => {
  const { actions } = useNotificationsContext();
  const { isLoading, response, error, loadNextPage } = usePagination(
    [],
    async (limit: number, page: number) =>
      getUserArticles(params.id, limit, page),
  );

  const isLoadMoreButtonVisible =
    response.data.length > 0 &&
    response.metadata.total >
      (response.metadata.page + 1) * response.metadata.limit;

  useEffect(() => {
    if (error) {
      actions.error(error);
    }
  }, []);

  return (
    <div className="flex w-full flex-col gap-6">
      <AnimatePresence>
        {response.data.length > 0 && (
          <motion.div
            className="flex flex-col gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                opacity: 1,
                transition: {
                  when: "beforeChildren",
                  staggerChildren: 0.2,
                  duration: 0.2,
                },
              },
            }}
          >
            {response.data.map((article, index) => (
              <Article key={index} article={article} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {isLoading && response.data.length === 0 && (
          <Spinner
            className="h-8 w-8 text-blueGray-500"
            containerClassName="flex justify-center items-center"
          />
        )}
        {!isLoading && response.data.length === 0 && (
          <motion.p
            className="text-center text-sm tracking-wider text-blueGray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            No articles here yet...
          </motion.p>
        )}
      </AnimatePresence>

      {isLoadMoreButtonVisible && (
        <LoadMoreButton isLoading={isLoading} onClick={() => loadNextPage()} />
      )}
    </div>
  );
};

export default Articles;
