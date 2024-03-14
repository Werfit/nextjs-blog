import { Source_Code_Pro } from "next/font/google";
import { getArticleById } from "@/actions/articles/articles.action";
import moment from "moment";

import "@/assets/styles/article.css";
import { calculateTimeToRead } from "@/utils/reading-time.util";
import Image from "next/image";

type ArticleProps = { params: { id: string } };

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-source-code-pro",
});

const Article: React.FC<ArticleProps> = async ({ params }) => {
  const { data } = await getArticleById(params.id);

  return (
    <article
      className={`!col-start-[full-screen] col-end-[full-screen] bg-white grid-container`}
    >
      <Image
        className="w-full h-96 object-cover mb-6 !col-start-[full-screen] !col-end-[full-screen]"
        src={data.featured_image_url}
        alt={data.title}
        width={1000}
        height={500}
      />
      <section className="flex items-center justify-between mb-4">
        <h1 className="text-3xl w-full flex-1 leading-6">{data.title}</h1>
        <div className="flex flex-col text-sm text-gray-500">
          <span>Author: {data.owner.username}</span>
          <span>Time to read: {calculateTimeToRead(data.content)} minutes</span>
        </div>
      </section>

      <section
        className={`leading-6 article ${sourceCodePro.variable}`}
        dangerouslySetInnerHTML={{ __html: data.content_html }}
      ></section>

      <footer className="text-sm text-gray-500 tracking-wider text-right">
        Article was written:{" "}
        <span className="font-semibold break-words">
          {moment(data.created_at).format("DD/MM/YYYY")}
        </span>
      </footer>
    </article>
  );
};

export default Article;
