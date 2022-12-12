import Link from "next/link";
import Button from "./Button";
type Props = {};

const NavBar: React.FC<Props> = ({ ...rest }) => {
  return (
    <header className="flex h-16 border-b border-slate-200 items-center justify-between px-24">
      <Link href={"/"}>
        <img src="/images/logo-with-text.svg" />
      </Link>
      <Link href={"/auth/sign-in"}>
        <Button>Sign In</Button>
      </Link>
    </header>
  );
};
export default NavBar;
