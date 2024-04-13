"use client";
import { AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { SuccessResponse } from "@/app/api/articles/search/[title]";
import { Icon } from "@/components/icon/icon.component";
import { useFetch } from "@/hooks/use-fetch.hook";
import { combineClassNames } from "@/utils/class-name.util";

import { SlidingInput } from "./sliding-input.component";

type SearchProps = {
  className?: string;
  from: string;
  to: string;
};

// TODO: Add behavior similar to CMD+K

const Search: React.FC<SearchProps> = ({ className, to, from }) => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [articles, setArticles] = useState<{
    data: SuccessResponse["articles"];
    isLoading: boolean;
    error: string | null;
  }>({
    data: [],
    isLoading: false,
    error: null,
  });

  const onSearchUpdate = async (value: string) => {
    if (value.length === 0) {
      setArticles({ data: [], isLoading: false, error: null });
      return;
    }

    setArticles((state) => ({ ...state, isLoading: true }));
    console.log("making a request");
    const response = await fetch(`/api/articles/search/${value}`, {
      method: "GET",
    });

    const result = await response.json();

    if (response.ok) {
      setArticles({
        isLoading: false,
        error: null,
        data: result.articles,
      });
      return;
    }

    setArticles({
      isLoading: false,
      error: null,
      data: result.message,
    });
  };

  return (
    <button
      className={combineClassNames(
        `flex gap-2 rounded-md bg-lightGray-200 px-2 transition`,
        !isSearchActive ? "hover:bg-lightGray-100" : "",
        className,
      )}
      onClick={() => {
        // when search bar is shown, shouldn't trigger opening again
        if (!isSearchActive) {
          setIsSearchActive(true);
        }
      }}
    >
      <Icon name="search" />

      <AnimatePresence>
        {isSearchActive && (
          <SlidingInput
            from={from}
            to={to}
            onClose={() => setIsSearchActive(false)}
            onChange={onSearchUpdate}
          />
        )}
      </AnimatePresence>
    </button>
  );
};

export { Search };
