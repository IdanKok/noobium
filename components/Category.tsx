import Button from "./Button";

type Props = {
    label:string

};

const Category: React.FC<Props> = ({label}) => {
  return (
    <button
      className="h-8 bg-slate-200 rounded-full px-4 text-sm font-sm"
      
    >
        {label}
    </button>
  );
};
export default Category;
