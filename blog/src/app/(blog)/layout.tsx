import { Navigation } from "@/components/navigation/navigation.component";
import { ReactNode } from "react";

type BlogLayoutProps = {
  children: ReactNode;
};

const BlogLayout: React.FC<BlogLayoutProps> = ({ children }) => {
  return (
    <main className="grid-container pb-10">
      <Navigation className="container mx-auto" />

      {children}
    </main>
  );
};

export default BlogLayout;
