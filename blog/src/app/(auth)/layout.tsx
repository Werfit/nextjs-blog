"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import Loader from "@/components/loader.component";

const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    getSession().then((session) => {
      if (session) {
        router.replace("/");
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  return isLoading ? <Loader /> : children;
};

export default AuthLayout;
