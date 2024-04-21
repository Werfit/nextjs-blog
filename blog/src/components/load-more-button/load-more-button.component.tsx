"use client";

import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { Spinner } from "@/components/spinner/spinner.component";
import { ANIMATION_CONFIG } from "@/constants/animation.constants";
import { combineClassNames } from "@/utils/class-name.util";

type LoadMoreButtonProps = Omit<
  HTMLMotionProps<"button">,
  "disabled" | "aria-disabled" | "initial" | "animate" | "exit"
> & {
  isLoading: boolean;
};

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({
  isLoading,
  className,
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
          className={combineClassNames(
            "rounded-md bg-lightGray-200 py-2 text-sm font-medium tracking-wider text-grayBlue-500 transition hover:bg-lightGray-400",
            className,
          )}
          disabled={isLoading}
          aria-disabled={isLoading}
          initial={{ opacity: isFirstRender ? 1 : 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={ANIMATION_CONFIG}
          {...params}
        >
          Load more
        </motion.button>
      )}
    </AnimatePresence>
  );
};
export { LoadMoreButton };
