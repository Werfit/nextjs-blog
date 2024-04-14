"use client";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

import { SuccessResponse } from "@/app/api/articles/search/route";
import { Icon } from "@/components/icon/icon.component";
import { combineClassNames } from "@/utils/class-name.util";

import { SearchDropdown } from "./search-dropdown.component";
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

  const isSearchResultEmpty =
    !articles.isLoading && !articles.error && articles.data?.length === 0;

  const onSearchUpdate = async (value: string) => {
    if (value.length === 0) {
      setArticles({ data: [], isLoading: false, error: null });
      return;
    }

    setArticles((state) => ({ ...state, isLoading: true }));
    const queryParams = new URLSearchParams({ title: value });
    const response = await fetch(
      `/api/articles/search?${queryParams.toString()}`,
      {
        method: "GET",
      },
    );

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
        `relative flex gap-2 rounded-md bg-lightGray-200 px-2 transition`,
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

      <AnimatePresence>
        {isSearchActive && !isSearchResultEmpty && (
          <SearchDropdown
            isLoading={articles.isLoading}
            articles={articles.data}
            error={articles.error}
            reset={() =>
              setArticles({ data: [], isLoading: false, error: null })
            }
          />
        )}
      </AnimatePresence>
    </button>
  );
};

export { Search };
