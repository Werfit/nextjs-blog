import { getArticles } from "@/actions/articles/articles.action";
import { Article } from "@/components/article/article.component";
import { Navigation } from "@/components/navigation/navigation.component";

const Home = async () => {
  const { data, metadata } = await getArticles();

  return (
    <main className="grid-container mx-auto gap-10 pb-10">
      <Navigation className="container mx-auto" />

      <div className="container !col-start-[full-screen] col-end-[full-screen] mx-auto grid grid-cols-1 gap-10 px-10 sm:px-0 md:grid-cols-2 xl:grid-cols-3">
        {data.map((article) => (
          <Article key={article.id} article={article} />
        ))}
      </div>
      <p className="mt-8 text-end font-mono text-sm text-gray-500">
        {data.length}/{metadata.total}
      </p>
    </main>
  );
};

export default Home;
