"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { getUserArticles } from "@/actions/articles/articles.action";
import { Article } from "@/components/article/article.component";
import { Spinner } from "@/components/spinner/spinner.component";
import { useNotificationsContext } from "@/provider/notifications/notifications.hook";

import { LoadMoreButton } from "./_components/load-more-button.component";

type ArticleProps = {
  params: {
    id: string;
  };
};

const Articles: React.FC<ArticleProps> = ({ params }) => {
  const [articles, setArticles] = useState<
    Awaited<ReturnType<typeof getUserArticles>>
  >({
    data: [],
    metadata: {
      limit: 2,
      page: 0,
      total: 0,
    },
  });
  const [isLoading, setIsLoading] = useState(true);
  const { actions } = useNotificationsContext();

  const isLoadMoreButtonVisible =
    articles.data.length > 0 &&
    articles.metadata.total >
      (articles.metadata.page + 1) * articles.metadata.limit;

  const getArticles = async () => {
    setIsLoading(true);

    try {
      const page =
        articles.data.length === 0
          ? articles.metadata.page
          : articles.metadata.page + 1;

      const response = await getUserArticles(
        params.id,
        articles.metadata.limit,
        page,
      );
      setArticles((state) => ({
        data: [...state.data, ...response.data],
        metadata: response.metadata,
      }));
    } catch (err) {
      const error = err as Error;
      actions.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // runs twice in dev mode
    getArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  return (
    <div className="flex w-full flex-col gap-6">
      <AnimatePresence>
        {articles.data.length > 0 && (
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
            {articles.data.map((article, index) => (
              <Article key={index} article={article} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {isLoading && articles.data.length === 0 && (
          <Spinner
            className="h-8 w-8 text-blueGray-500"
            containerClassName="flex justify-center items-center"
          />
        )}
        {!isLoading && articles.data.length === 0 && (
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
        <LoadMoreButton isLoading={isLoading} onClick={() => getArticles()} />
      )}
    </div>
  );
};

export default Articles;
