import Head from "next/head";
import type { NextPage } from "next";
import NavBar from "../../components/NavBar";
import Article from "../../components/Article";

import Link from "next/link";
const CategoryArticlesPage: NextPage = () => {
  const articles = [...Array(3)].map((_, index) => {
    return {
      id: index + 1,
      slug: "how-to-learn-redux",
      title: "How to Learn Redux",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas etiam morbi varius sapien. Eu arcu morbi tortor rhoncus. Donec pellentesque diam orci enim, nibh diam. Nulla id ut risus quisque felis tristique metus...",
      thumbnail: "/images/dummy-thumbnail.png",
      category: "Technology",
      date: "2022-09-20 16:00:00",
      author: {
        name: "John Doe",
        photo: "/images/dummy-avatar.png",
      },
    };
  });
  return (
    <div>
      <Head>
        <title>Technology || Noobium</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />
      <div className="w-[720px] mx-auto py-24">
        <div className="mb-16">
          <p className="font-sans font-bold  text-slate-400 mb-3">Category</p>
          <p className="font-sans font-bold  text-slate-900 text-5xl">
            Technology
          </p>
        </div>
        {articles.map((article) => (
          <Article
            url={`/articles/${article.slug}`}
            title={article.title}
            content={article.content}
            thumbnail={article.thumbnail}
            category={article.category}
            date={article.date}
            author={article.author}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryArticlesPage;
