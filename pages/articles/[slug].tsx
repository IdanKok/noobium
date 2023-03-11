import Head from "next/head";
import type { GetServerSideProps, NextPage } from "next";
import NavBar from "../../components/NavBar";
import { parseISO, format } from "date-fns";
import axios from '../../helpers/axios'
import { type } from "os";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const response = await axios.get(`/articles/${query.slug}`)

    return {
      props:{
        article: response.data.data,
      }
    }
  } catch (error: any) {
    if (error.response.status === 404) {
      return {
        notFound: true,
      };
    }

    return {
      props: {},
    };
  }
};

type Props = {
  article: {
    id: number;
    user_id: number;
    category_id: number;
    title: string;
    slug: string;
    content_preview: string;
    content: string;
    featured_image: string;
    created_at: string;
    updated_at: string;
    category: {
      id: number;
      name: string;
      slug: string;
    };
    user: {
      id: number;
      name: string;
      email: string;
      picture: string;
    };
  }
}

const ArticleDetailPage: NextPage<Props> = ({article}) => {


  const formattedDate = format(parseISO(article?.created_at), "MM-dd");
  console.log(article.created_at)

  return (
    <div>
      <Head>
        <title>{article.title}|| Noobium</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />
      <div className="w-[720px] mx-auto py-24">
        <div className="flex items-center mb-8">
          <img
            className="object-cover rounded-full w-12 h-12 mr-4"
            src={article.user.picture}
            alt={article.user.name}
          />

          <div>
            <p className="font-sans font-normal text-sm mb-1 text-slate-900">
              {article.user.name}
            </p>
            <p className="font-sans text-sm font-normal text-slate-400">
              {formattedDate}
            </p>
          </div>
        </div>

        <h1 className="font-sans font-bold text-5xl text-slate-900 mb-6">
          {article.title}
        </h1>
        <div className="px-3 h-6 bg-slate-200 rounded-full w-fit flex items-center mb-12  ">
          <p className="font-sans text-slate-900 text-xs font-normal">
            {article.category?.name}
          </p>
        </div>
        <img
          className="w-full aspect-video object-cover mb-12"
          src={article.featured_image}
          alt={article.title}
        />
        <p
          className="font-serif font-normal text-base text-slate-900 whitespace-pre-line">{article.content}</p>
        
      </div>
    </div>
  );
};

export default ArticleDetailPage;
