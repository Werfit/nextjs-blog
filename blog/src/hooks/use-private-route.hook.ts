"use client";

import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const usePrivateRoute = (redirectTo: string = "/auth/login") => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);

    getSession().then((session) => {
      if (!session) {
        router.replace(redirectTo);
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  return { isLoading };
};
