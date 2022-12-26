import Button from "./Button";
import classNames from "classnames";
import { is } from "date-fns/locale";

type Props = {
    label:string;
    isSelected?: boolean;
    onClick?:  () => void;

};

const Category: React.FC<Props> = ({label, isSelected, onClick}) => {
  return (
    <button
      className={classNames("h-8  rounded-full px-4 text-sm font-sm",{
        "bg-slate-200" : !isSelected,
        "bg-blue-800": isSelected,
        "text-slate-900": !isSelected,
        "text-white": isSelected,
      })}
      onClick={onClick}
    >
        {label}
    </button>
  );
};
export default Category;
