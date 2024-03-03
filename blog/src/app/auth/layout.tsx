"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import Loader from "@/components/loader/loader.component";

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

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex w-screen h-screen items-center justify-center">
      <div>
        <h1 className="text-center text-2xl font-bold tracking-widest text-black-700">
          Welcome to Werfit Blog!
        </h1>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
