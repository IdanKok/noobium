import Button from "./Button";
import Link from "next/link";

type Props = {};

const AccountDropDown: React.FC<Props> = ({}) => {
  const user = {
    name: "John Doe",
    email: "john.doe@gmail.com",
  };
  return (
    <div className="w-48 rounded-md border border-slate-200 absolute bg-white right-0 top-full">
      <div className="p-4 border border-slate-200">
        <p className="font-sans text-slate-900 font-bold">{user.name}</p>
        <p className="font-sans text-slate-400 text-xs">{user.email}</p>
      </div>
      <div className="p-4">
        <ul>
          <li className="mb-3">
            <Link href={"#"}>
              <p className="font-sans text-slate-900 font-normal text-xs">
                My Profile
              </p>
            </Link>
          </li>
          <li className="mb-3">
            <Link href={"#"}>
              <p className="font-sans text-slate-900 font-normal text-xs">
                My Article
              </p>
            </Link>
          </li>{" "}
          <li className="h-4">
              <button className="font-sans text-red-500 font-normal text-xs">
                Sign Out
              </button>
            
          </li>
        </ul>
      </div>
    </div>
  );
};
export default AccountDropDown;
