import Link from "next/link";
import Button from "./Button";
import { MdSearch } from "react-icons/md";
import { useState } from "react";
import AccountDropDown from "./AccountDropDown";
type Props = {};

const NavBar: React.FC<Props> = ({ ...rest }) => {
  const [keyword, setKeyword] = useState("");
  const isLoggedIn = true;
  const [isDropDownOpen, setIsDropDwonOpen] = useState(false);

  return (
    <header className="flex h-16 border-b border-slate-200 items-center justify-between px-24">
      <Link href={"/"}>
        <img src="/images/logo-with-text.svg" />
      </Link>
      <div className="w-[720px] absolute left-1/2 -translate-x-1/2 flex items-center">
        <MdSearch className="text-slate-400 mr-4" size={24} />
        <input
          className="font-sans font-normal text-sm placeholder-slate-400 text-slate-900 outline-none"
          type="text"
          placeholder="Search"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
        />
      </div>
      {isLoggedIn && (
        <div className="relative">
          <button onClick={() => setIsDropDwonOpen(!isDropDownOpen)}>
            <img
              src="/images/dummy-avatar.png"
              alt="John Doe"
              className="w-10 h-10 rounded-full object-cover"
            />
          </button>
          {isDropDownOpen && <AccountDropDown />}
        </div>
      )}
      {!isLoggedIn && (
        <Link href={"/auth/sign-in"}>
          <Button>Sign In</Button>
        </Link>
      )}
    </header>
  );
};
export default NavBar;