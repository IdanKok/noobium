import Head from "next/head";
import type { NextPage } from "next";
import NavBar from "../components/NavBar";
import Article from "../components/Article";
import Category from "../components/Category";
import { useRouter } from "next/router";
import Button from "../components/Button";
import  Link from 'next/link'

const MyArticlesPage: NextPage = () => {
  const router = useRouter();

  const articles = [...Array(5)].map((_, index) => {
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
        <title>My Articles || Noobium</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar hasSearchInput={false}/>
      <div className="w-[720px] mx-auto py-24">
        <div className="mb-16 flex items-center justify-between">
          <p className="font-sans font-bold  text-slate-900 text-5xl">
            My Articles
          </p>
          <Link href={"/my-articles/create"}>
            <Button size="large" type="button">
              Write an Article
            </Button>
          </Link>
        </div>
        {articles.map((article) => (
          <Article
            key={article.id}
            url={`/articles/${article.slug}`}
            title={article.title}
            content={article.content}
            thumbnail={article.thumbnail}
            category={article.category}
            date={article.date}
            author={article.author}
            hasOptions
          />
        ))}
      </div>
    </div>
  );
};

export default MyArticlesPage;
