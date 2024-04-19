"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ButtonHTMLAttributes, useEffect, useState } from "react";

import { ANIMATION_CONFIG } from "@/constants/animation.constants";
import { combineClassNames } from "@/utils/class-name.util";

import { Icon } from "../../icon/icon.component";
import { Spinner } from "../../spinner/spinner.component";

type FormSubmitButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
  successContent?: string;
  errorContent?: string;
};

const getButtonBackgroundColor = (
  isLoading?: boolean,
  isDone?: boolean,
  isError?: boolean,
): string => {
  if (!isDone && !isLoading && !isError) {
    return "hover:bg-primary-700 bg-primary-500";
  }

  if (isError) {
    return "bg-rose-800";
  }

  if (isLoading) {
    return "bg-primary-700/50";
  }

  return "bg-emerald-500";
};

const FormSubmitButton: React.FC<FormSubmitButtonProps> = ({
  isLoading,
  children,
  className,
  isSuccess,
  isError,
  successContent,
  errorContent,
  ...props
}) => {
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    setIsFirstRender(false);
  }, []);

  return (
    <button
      {...props}
      className={combineClassNames(
        `rounded-md py-2 text-lg font-medium tracking-wider text-white transition`,
        getButtonBackgroundColor(isLoading, isSuccess, isError),
        className,
      )}
      disabled={isLoading || isSuccess || isError}
      aria-disabled={isLoading || isSuccess || isError}
    >
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.span
            key="loader"
            className="flex items-center justify-center"
            initial={{ opacity: isFirstRender ? 1 : 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              type: "tween",
              ...ANIMATION_CONFIG,
            }}
          >
            <Spinner
              className="me-2 inline h-4 w-4  animate-spin text-white"
              containerClassName="flex justify-center"
            />{" "}
            Loading
          </motion.span>
        )}

        {!isSuccess && !isLoading && !isError && (
          <motion.span
            key="content"
            initial={{ opacity: isFirstRender ? 1 : 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              type: "tween",
              ...ANIMATION_CONFIG,
            }}
          >
            {children}
          </motion.span>
        )}

        {isSuccess && (
          <motion.span
            key="done"
            initial={{ opacity: isFirstRender ? 1 : 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center gap-1"
            transition={{
              type: "tween",
              ...ANIMATION_CONFIG,
            }}
          >
            <Icon
              name="done_all"
              className="!my-0 text-base leading-none"
              filled
            />
            {successContent ?? "Success"}
          </motion.span>
        )}

        {isError && (
          <motion.span
            key="error"
            initial={{ opacity: isFirstRender ? 1 : 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center gap-1"
            transition={{
              type: "tween",
              ...ANIMATION_CONFIG,
            }}
          >
            <Icon
              name="error"
              className="!my-0 text-base leading-none"
              filled
            />
            {errorContent ?? "Error"}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
};

export { FormSubmitButton };
