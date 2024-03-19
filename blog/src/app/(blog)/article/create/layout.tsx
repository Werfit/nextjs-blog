"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import { Loader } from "@/components/loader/loader.component";

type CreateArticleLayoutProps = {
  children: React.ReactNode;
};

const CreateArticleLayout: React.FC<CreateArticleLayoutProps> = ({
  children,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    getSession().then((session) => {
      if (!session) {
        router.replace("/auth/login");
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  if (isLoading) {
    return <Loader />;
  }

  return children;
};

export default CreateArticleLayout;
