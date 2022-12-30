import Head from "next/head";
import type { NextPage } from "next";
import NavBar from "../components/NavBar";
import Button from "../components/Button";
import Link from "next/link";

const NotFoundPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>404 | Noobium</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar hasSearchInput={false} />
      <div style={{ height: 'calc(100vh - 4rem)'}} className="w-[720px] mx-auto py-24 flex flex-col items-center justify-center">
        <h1 className="font-sans font-bold text-8xl text-slate-900 text-center mb-6 mt-">
          404
        </h1>
        <p className="font-sans font-normal text-base text-slate-900 text-center mb-16">
          There's no content here{" "}
        </p>
        <Link href={"/"}>
          <Button size="large" type="button">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
