"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { SuccessResponse } from "@/app/api/articles/search/route";
import { ANIMATION_CONFIG } from "@/constants/animation.constants";
import { useAnimationOnInitAndCleanup } from "@/hooks/use-animation-on-init-cleanup.hook";

import { Spinner } from "../spinner/spinner.component";

type SearchDropdownProps = {
  isLoading: boolean;
  articles: SuccessResponse["articles"];
  error: string | null;
  reset: () => void;
};

const SearchDropdown: React.FC<SearchDropdownProps> = ({
  isLoading,
  articles,
  error,
  reset,
}) => {
  const router = useRouter();

  const { scope } = useAnimationOnInitAndCleanup<HTMLDivElement>({
    onEnter: async (scope, animate) => {
      await animate(scope.current, { opacity: 1 }, ANIMATION_CONFIG);
    },
    onExit: async (scope, animate) => {
      await animate(scope.current, { opacity: 0 }, ANIMATION_CONFIG);
      reset();
    },
  });

  return (
    <motion.div
      className="absolute left-0 top-full w-full translate-y-2 overflow-clip rounded-md bg-white opacity-0 shadow-md shadow-black-700/10"
      initial={{ opacity: 0 }}
      ref={scope}
    >
      {isLoading && (
        <AnimatePresence>
          <Spinner
            className="flex h-8 w-8 fill-primary-500 text-lightGray-200"
            containerClassName="flex items-center justify-center py-2 px-1"
          />
        </AnimatePresence>
      )}
      {!isLoading &&
        articles &&
        articles.map((article) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={ANIMATION_CONFIG}
            className="bg-light-gray-200 flex items-center gap-2 px-2 py-2 text-left text-sm opacity-0 transition hover:bg-gray-200"
            onClick={() => {
              router.push(`/article/${article.id}`);
            }}
          >
            <Image
              src={article.featuredImageUrl}
              alt={article.title}
              width={50}
              height={50}
              className="h-10 w-10 rounded-md object-cover"
            />
            {article.title}
          </motion.div>
        ))}
      {!isLoading && error && (
        <p className="bg-lightGray-200 px-2 py-2">Error</p>
      )}
    </motion.div>
  );
};

export { SearchDropdown };
