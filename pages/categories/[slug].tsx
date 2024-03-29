import Head from "next/head";
import type { NextPage } from "next";
import NavBar from "../../components/NavBar";
import Article from "../../components/Article";
import useArticlesQuery from "../../hooks/queries/use-articles-query";
import useCategoriesQuery from "../../hooks/queries/use-categories-query";

import { useEffect, Fragment } from "react";
import { useRouter } from "next/router";
import Loading from "react-spinners/BeatLoader";

import Link from "next/link";
const CategoryArticlesPage: NextPage = () => {
  const router = useRouter();

  const articlesQuery = useArticlesQuery({
    category: router.query.slug as string,
  });
  const categoriesQuery = useCategoriesQuery();

  const categoryName = categoriesQuery.data?.find(
    (category) => category.slug === router.query.slug
  )?.name || "Unkown";
  useEffect(() => {
    const handler = () => {
      const { scrollHeight, scrollTop, clientHeight } =
        document.documentElement;
      const isScrollToBottom = scrollHeight - scrollTop === clientHeight;

      if (isScrollToBottom) {
        if (articlesQuery.hasNextPage && !articlesQuery.isFetchingNextPage) {
          articlesQuery.fetchNextPage();
          console.log(articlesQuery.data);
        }
      }
    };

    document.addEventListener("scroll", handler);

    return () => {
      document.removeEventListener("scroll", handler);
    };
  }, [articlesQuery.isSuccess, articlesQuery.data]);

  return (
    <div>
      <Head>
        <title>{categoryName} || Noobium</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />
      <div className="w-[720px] mx-auto py-24">
        <div className="mb-16">
          <p className="font-sans font-bold  text-slate-400 mb-3">Category</p>
          <p className="font-sans font-bold  text-slate-900 text-5xl">{categoryName}</p>
        </div>

        {articlesQuery.isSuccess && (
          <>
            {articlesQuery.data.pages.map((page, index) => (
              <Fragment key={index}>
                {page.data.map((article) => (
                  <Article
                    key={article.id}
                    url={`/articles/${article?.slug}`}
                    title={article?.title}
                    content={article?.content_preview}
                    thumbnail={article?.featured_image}
                    category={article.category?.name}
                    date={article?.created_at}
                    author={{
                      name: article.user?.name,
                      photo: article.user?.picture,
                    }}
                  />
                ))}
              </Fragment>
            ))}
            {articlesQuery.isFetchingNextPage && (
              <div className="flex justify-center mt-8">
                <Loading size={16} color={"rgb(30 64 175)"} />
              </div>
            )}
          </>
        )}

        {articlesQuery.isLoading && (
          <div className="flex justify-center">
            <Loading size={16} color={"rgb(30 64 175)"} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryArticlesPage;
