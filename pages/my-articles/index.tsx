import Head from "next/head";
import type { NextPage } from "next";
import NavBar from "../../components/NavBar";
import Article from "../../components/Article";
import { useRouter } from "next/router";
import Button from "../../components/Button";
import Link from "next/link";
import useMyArticlesQuery from "../../hooks/queries/use-my-articles-query";
import { useEffect, Fragment } from "react";
import Loading from "react-spinners/BeatLoader";


const MyArticlesPage: NextPage = () => {
  const router = useRouter();

  const myArticlesQuery = useMyArticlesQuery();

  useEffect(() => {
    const handler = () => {
      const { scrollHeight, scrollTop, clientHeight } =
        document.documentElement;
      const isScrollToBottom = scrollHeight - scrollTop === clientHeight;
      console.log(myArticlesQuery.data);
      if (isScrollToBottom) {
        if (myArticlesQuery.hasNextPage && !myArticlesQuery.isFetchingNextPage) {
          myArticlesQuery.fetchNextPage();
          
        }

       
      }
    };

    document.addEventListener("scroll", handler);

    return () => {
      document.removeEventListener("scroll", handler);
    };
  }, [myArticlesQuery.isSuccess, myArticlesQuery.data]);

  return (
    <div>
      <Head>
        <title>My Articles || Noobium</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar hasSearchInput={false} />
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
        {myArticlesQuery.isSuccess && (
          <>
            {myArticlesQuery.data.pages.map((page, index) => (
              <Fragment key={index}>
                {page.data.map((article) => (
                  <Article
                    key={article.id}
                    url={`/articles/${article?.slug}`}
                    editURL={`/my-articles/${article.slug}`}
                    title={article?.title}
                    content={article?.content_preview}
                    thumbnail={article?.featured_image}
                    category={article.category?.name}
                    date={article?.created_at}
                    author={{
                      name: article.user?.name,
                      photo: article.user?.picture,
                    }}
                    hasOptions
                  />
                ))}
              </Fragment>
            ))}
            {myArticlesQuery.isFetchingNextPage && (
              <div className="flex justify-center mt-8">
                <Loading size={16} color={"rgb(30 64 175)"} />
              </div>
            )}
          </>
        )}

        {myArticlesQuery.isLoading && (
          <div className="flex justify-center">
            <Loading size={16} color={"rgb(30 64 175)"} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MyArticlesPage;
