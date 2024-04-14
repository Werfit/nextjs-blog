"use client";

import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

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
