import { getArticles } from "@/actions/articles/articles.action";
import { Article } from "@/components/article/article.component";
import { Navigation } from "@/components/navigation/navigation.component";

const Home = async () => {
  const { data, count } = await getArticles();

  return (
    <main className="grid-container mx-auto">
      <Navigation className="!col-start-[full-screen] col-end-[full-screen] container mx-auto" />

      <div className="grid">
        {data.map((article) => (
          <Article
            key={article.id}
            article={article}
          />
        ))}
        <p className="text-end text-sm text-gray-500 font-mono">
          {data.length}/{count}
        </p>
      </div>
    </main>
  );
};

export default Home;
