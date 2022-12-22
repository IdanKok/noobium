import { parseISO, format } from "date-fns";
import Link from "next/link";
import {MdOutlineModeEdit, MdDeleteOutline} from 'react-icons/md'

type Props = {
  title: string;
  content: string;
  editURL?: string;
  url: string;
  thumbnail: string;
  category: string;
  date: string;
  author: {
    name: string;
    photo: string;
  };
  hasOptions?: boolean;
  onClickDelete?: () => void;
};

const Article: React.FC<Props> = ({
  title,
  content,
  url,
  thumbnail,
  category,
  date,
  author,
  hasOptions,
  onClickDelete,
  editURL
}) => {
  const formattedDate = format(parseISO(date), "MMM dd");

  return (
    <div className="border-b border-slate-200 py-8">
      <div className="flex items-center">
        <img
          className="w-6 h-6 mr-2 rounded-full object-cover"
          src={author.photo}
          alt={author.name}
        />
        <p className="font-sans text-sm font-normal text-slate-900">
          {author.name}
        </p>
        <div className="w-[2px] h-[2px] rounded-full bg-slate-400 mx-2"></div>
        <p className="font-sans text-sm font-normal text-slate-400">
          {formattedDate}
        </p>
      </div>
      <div className="flex items-center mb-8">
        <div className="mr-10">
          <Link href={url}>
            <h1 className="font-sans font-semibold text-2xl text-slate-900 mb-4">
              {title}
            </h1>
          </Link>
          <p className="font-serif text-slate-900 font-normal text-sm">
            {content}
          </p>
        </div>
        <img className="w-32 h-32" src={thumbnail} alt={title} />
      </div>
      <div className="flex items-center justify-between">
        <div className="px-3 h-6 bg-slate-200 flex items-center w-fit rounded-full">
          <p className="text-slate-900 font-sans font-normal text-xs ">
            {category}
          </p>
        </div>
        { hasOptions && (
        <div className="flex items-center">
          <Link href={editURL || ''}>
          <button type="button" className="mr-6">
            <MdOutlineModeEdit className="h-5 w-5 text-slate-900 "/>
          </button>
          </Link>
          <button type="button" onClick={onClickDelete}>
            <MdDeleteOutline className="h-5 w-5 text-red-500"/>
          </button>
          <div className="w-[168px]"/>
        </div>
        )}
      </div>
    </div>
  );
};
export default Article;
