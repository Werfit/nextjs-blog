import Navigation from "@/components/navigation/navigation.component";
import CreateArticleModal from "@/components/article/create-article-modal.component";

const Home = () => {
  return (
    <main>
      <Navigation />

      {/*<CreateArticleModal />*/}
      <button className="fixed bottom-10 right-10 text-2xl border-2 border-emerald-500 text-emerald-500 rounded-full px-4 py-2 shadow-md shadow-emerald-600/20 transition hover:bg-emerald-500 hover:text-white">
        +
      </button>
    </main>
  );
};

export default Home;
