"use client";

import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { Spinner } from "@/components/spinner/spinner.component";

type LoadMoreButtonProps = Omit<
  HTMLMotionProps<"button">,
  "disabled" | "aria-disabled" | "initial" | "animate" | "exit"
> & {
  isLoading: boolean;
};

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({
  isLoading,
  ...params
}) => {
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
    }
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <Spinner
          className="h-8 w-8 text-blueGray-500"
          containerClassName="flex justify-center items-center"
        />
      ) : (
        <motion.button
          className="hover:bg-lightGray-400 text-grayBlue-500 rounded-md bg-lightGray-200 py-2 text-sm font-medium tracking-wider transition"
          disabled={isLoading}
          aria-disabled={isLoading}
          initial={{ opacity: isFirstRender ? 1 : 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          {...params}
        >
          Load more
        </motion.button>
      )}
    </AnimatePresence>
  );
};
export { LoadMoreButton };
