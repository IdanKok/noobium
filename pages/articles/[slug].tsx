import Head from "next/head";
import type { NextPage } from "next";
import NavBar from "../../components/NavBar";
import { parseISO, format } from "date-fns";

const ArticleDetailPage: NextPage = () => {
  const article = {
    id: 1,
    slug: "how to learn redux",
    title: "How to Learn Redux",
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer et nibh egestas suspendisse nulla ipsum etiam gravida. Est eu, sed tortor in rutrum in. Egestas
    
    tincidunt sed venenatis faucibus sed. Arcu dictum lobortis pellentesque purus massa. Cras hendrerit blandit sed at. Euismod praesent ultrices sit cursus molestie ac. Amet, pellentesque interdum etiam tortor, dui. Quam cras quis condimentum amet, rhoncus diam, dictumst. Platea eu sodales vitae ipsum ac. Auctor etiam sagittis faucibus non pharetra elit.\n\n
     Malesuada massa pellentesque nunc diam neque. Consequat sollicitudin purus in egestas egestas commodo non tempus. Praesent lorem est, quis tincidunt varius. Quisque facilisis dignissim scelerisque nunc senectus rhoncus massa sollicitudin id.
     Ornare viverra neque vitae gravida habitasse tellus ultrices. Id blandit ut sed sed aliquam vitae. Eu nibh dignissim rutrum sit blandit. Quisque libero commodo, cursus est cursus. Cursus varius eget velit consectetur vel potenti.\n\n
     Ipsum molestie erat laoreet in pharetra. Rhoncus, netus malesuada velit felis proin sem. Aliquet dictum sagittis a ornare lacus sed ut. Aenean vitae convallis in adipiscing. At dictumst sagittis, tincidunt pellentesque scelerisque pellentesque sem auctor. Ultricies urna sit in ac sed arcu turpis. Feugiat elit quam pulvinar elementum, turpis auctor ornare leo, neque.\n\n
     Est interdum sed amet integer libero tincidunt. Mauris, nunc sapien, donec placerat massa. Tellus proin tortor, hendrerit sed vitae. Lectus aliquet purus elementum at et. Adipiscing imperdiet lacus eget aenean risus egestas malesuada lobortis pulvinar.
     Ut at rhoncus suspendisse non sed nec viverra. Cursus vitae adipiscing morbi vitae. Ultricies non neque, sed pulvinar sit amet, nunc. Bibendum vitae et ac cras nulla mi id amet. A viverra sed gravida id dictum.`,
    thumbnail: "/images/dummy-thumbnail.png",
    category: "Technology",
    date: "2022-09-20 16:00:00",
    author: {
      name: "John Doe",
      photo: "/images/dummy-avatar.png",
    },
  };

  const formattedDate = format(parseISO(article.date), "MMM dd");

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
            src={article.author.photo}
            alt={article.author.name}
          />

          <div>
            <p className="font-sans font-normal text-sm mb-1 text-slate-900">
              {article.author.name}
            </p>
            <p className="font-sans text-sm font-normal text-slate-400">
              {formattedDate}
            </p>
          </div>
        </div>

        <h1 className="font-sans font-bold text-5xl text-slate-900 mb-2">
          {article.title}
        </h1>
        <div className="px-3 h-6 bg-slate-200 rounded-full w-fit flex items-center mb-12  ">
          <p className="font-sans text-slate-900 text-xs font-normal">
            {article.category}
          </p>
        </div>
        <img
          className="w-full aspect-video object-cover mb-12"
          src={article.thumbnail}
          alt={article.title}
        />
        <p
          className="font-serif font-normal text-base text-slate-900 whitespace-pre-line">{article.content}</p>
        
      </div>
    </div>
  );
};

export default ArticleDetailPage;
