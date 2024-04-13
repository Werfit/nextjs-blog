"use client";

import { Loader } from "@/components/loader/loader.component";
import { usePrivateRoute } from "@/hooks/use-private-route.hook";

type CreateArticleLayoutProps = {
  children: React.ReactNode;
};

const CreateArticleLayout: React.FC<CreateArticleLayoutProps> = ({
  children,
}) => {
  const { isLoading } = usePrivateRoute();

  if (isLoading) {
    return <Loader />;
  }

  return children;
};

export default CreateArticleLayout;
