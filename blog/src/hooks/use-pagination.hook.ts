"use client";

import { useEffect, useRef, useState } from "react";

import { PaginationResponse } from "@/actions/articles/articles.types";

type DefaultPaginationResponse<DataItem> = {
  data: DataItem[];
  metadata: PaginationResponse;
};

const usePagination = <Response>(
  defaultValue: DefaultPaginationResponse<Response>["data"],
  action: (
    limit: number,
    page: number,
  ) => Promise<DefaultPaginationResponse<Response>>,
) => {
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const isFirstRerender = useRef(true);

  const [response, setResponse] = useState<DefaultPaginationResponse<Response>>(
    {
      data: defaultValue,
      metadata: {
        total: 0,
        limit: 5,
        page: 0,
      },
    },
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadNextPage = async () => {
    setIsLoading(true);
    const page = response.metadata.page + (isFirstLoad ? 0 : 1);

    try {
      const actionResponse = await action(response.metadata.limit, page);
      setResponse((state) => ({
        metadata: actionResponse.metadata,
        data: [...state.data, ...actionResponse.data],
      }));
    } catch (err) {
      const error = err as Error;
      setError(error.message);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (isFirstRerender.current) {
      isFirstRerender.current = false;
      loadNextPage().then(() => {
        setIsFirstLoad(false);
      });
    }
  }, []);

  return { response, isLoading, error, loadNextPage };
};

export { usePagination };
