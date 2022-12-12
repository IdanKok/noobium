import Head from "next/head";
import Button from "../../components/Button";
import NavBar from "../../components/NavBar";
import TextInput from "../../components/TextInput";
import { useFormik, Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Link from "next/link";

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email Format Is Invalid")
    .required("Email Is Required"),
});

const SignInPage = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SignInSchema,
    onSubmit: () => {
      alert("Sign In Succesfully");
    },
  });
  return (
    <div>
      <Head>
        <title>Sig In | Noobium</title>
      </Head>
      <NavBar />
      <div className="w-[400px] mx-auto py-24">
        <h1 className="font-sans font-bold text-slate-900 text-5xl text-center mb-4">
          Sign In
        </h1>
        <p className="text-center text-base font-sans  text-slate-900 mb-16">
          Fill the form to sign in to your account.
        </p>
        <TextInput
          name="email"
          label="Email Addres"
          placeholder="Enter your email address"
          type="text"
          value={formik.values.email}
          hasError={!!formik.errors.email}
          errorMessage={formik.errors.email}
          onChange={formik.handleChange}
        />

        <div className="h-4" />

        <TextInput
          name="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={formik.values.password}
          hasError={!!formik.errors.password}
          errorMessage={formik.errors.password}
          onChange={formik.handleChange}
        />

        <div className="h-10" />

        <Button size="large" isFullWidth onClick={() => formik.handleSubmit()}>
          Sign In
        </Button>
        <p className="text-slate-900 text-center font-sans text-sm mt-8">
          Don't have an account ?
          <Link href={"/auth/sign-up"} className="text-blue-800 hover:bg-blue-800 hover:text-white hover:px-2 hover:duration-100 hover:rounded-full hover:h-7 hover:ml-1"> Sign up here </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
