import Link from "next/link";
import Button from "./Button";
import { MdSearch } from "react-icons/md";
import { useEffect, useState } from "react";
import AccountDropDown from "./AccountDropDown";
import { useRouter } from "next/router";
import useUserQuery from "../hooks/queries/use-user-query";
import { refreshToken } from "../helpers/axios";

type Props = {
  hasSearchInput?: boolean;
  hasSubmitButton?: boolean;
  isSubmitDisabled?: boolean;
  submitLabel?: string;
  onClickSubmit?: () => void;
};

const NavBar: React.FC<Props> = ({
  hasSearchInput = true,
  hasSubmitButton,
  isSubmitDisabled,
  submitLabel,
  onClickSubmit,
}) => {
  const userQuery = useUserQuery()
  const [keyword, setKeyword] = useState("");
  const isLoggedIn = !!userQuery.data;
  const initialFullName = userQuery.data?.name
    .split(" ")
    .map((word) => word[0].toUpperCase())
    .join("") || "";
  const [isDropDownOpen, setIsDropDwonOpen] = useState(false);
  const router = useRouter();
 

  useEffect(() => {
    setKeyword((router.query.keyword as string) || "");
  }, [router.query.keyword]);

  useEffect(() => {
    const generatedAt = localStorage.getItem('access_token_generated_at')
    const expiredAt = localStorage.getItem('access_token_expired_at')
  
    if(generatedAt && expiredAt){
      const now = Date.now()
      const afterGenerated15min = Number(generatedAt) + 900 * 1000
      const beforeExpired5min = Number(expiredAt) - 300 * 1000

      if(now > afterGenerated15min && now < beforeExpired5min){
        refreshToken()
      }

    }
  })

  return (
    <header className="flex h-16 border-b border-slate-200 items-center justify-between px-24">
      <Link href={"/"}>
        <img src="/images/logo-with-text.svg" />
      </Link>
      {hasSearchInput && (
        <div className="w-[720px] absolute left-1/2 -translate-x-1/2 flex items-center">
          <MdSearch className="text-slate-400 mr-4" size={24} />
          <input
            className="font-sans font-normal text-sm placeholder-slate-400 text-slate-900 outline-none"
            type="text"
            placeholder="Search"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                router.push(`/search?keyword=${keyword}`);
              }
            }}
          />
        </div>
      )}

      <div className="flex items-center">
        {hasSubmitButton && (
          <>
            {/* <> </> adalah lambang fragment fitur dari react yang berfungsi jika kita ingin menampilkan lebih dari satu komponen/ multiple component */}
            <Button
              type="button"
              onClick={onClickSubmit}
              disabled={isSubmitDisabled}
            >
              {submitLabel}
            </Button>
            <div className="w-6" />
          </>
        )}

        {isLoggedIn && (
          <div className="relative">
            <button onClick={() => setIsDropDwonOpen(!isDropDownOpen)}>
              {!!userQuery.data?.picture && (
                <img
                  src={userQuery.data.picture}
                  alt={userQuery.data.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              )}

              {!userQuery.data?.picture && (
                <div className="w-10 h-10 rounded-full bg-blue-800 flex justify-center items-center">
                  <p className="font-bold font-sans text-base text-white">
                    {initialFullName}
                  </p>
                </div>
              )}
            </button>
            {isDropDownOpen && <AccountDropDown />}
          </div>
        )}
        {!isLoggedIn && (
          <Link href={"/auth/sign-in"}>
            <Button>Sign In</Button>
          </Link>
        )}
      </div>
    </header>
  );
};
export default NavBar;
