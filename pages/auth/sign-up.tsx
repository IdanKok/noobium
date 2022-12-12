import Head from "next/head";
import Button from "../../components/Button";
import NavBar from "../../components/NavBar";
import TextInput from "../../components/TextInput";
import { useFormik, Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Link from "next/link";

const SignUpSchema = Yup.object().shape({
  fullname: Yup.string()
    .min(8, "Full Name should have at least 8 characters")
    .max(30, "Full Name should have maximum 30 characters")
    .required("Full Name is required"),
  email: Yup.string()
    .email("Email Format Is Invalid")
    .required("Email Is Required"),
  password: Yup.string()
    .min(8, "Password should have at least 8 characters")
    .max(50, "Password should have maximum 50 characters")
    .required("Password Is Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Confirm password is mismatch")
    .required("Confirm Password is required"),
});

const SignUpPage = () => {
  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: SignUpSchema,
    onSubmit: () => {
      alert("Sign Up Succesfully");
    },
  });
  return (
    <div>
      <Head>
        <title>Sign Up | Noobium</title>
      </Head>
      <NavBar />
      <div className="w-[400px] mx-auto py-24">
        <h1 className="font-sans font-bold text-slate-900 text-5xl text-center mb-4">
          Sign Up
        </h1>
        <p className="text-center text-base font-sans  text-slate-900 mb-16">
          Fill the form to create an account.
        </p>
        <TextInput
          name="fullname"
          label="Full Name"
          placeholder="Enter your full name"
          type="text"
          value={formik.values.fullname}
          hasError={!!formik.errors.fullname}
          errorMessage={formik.errors.fullname}
          onChange={formik.handleChange}
        />

        <div className="h-4" />
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

        <TextInput
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Enter your password again"
          value={formik.values.confirmPassword}
          hasError={!!formik.errors.confirmPassword}
          errorMessage={formik.errors.confirmPassword}
          onChange={formik.handleChange}
        />


        <div className="h-10" />

        <Button size="large" isFullWidth onClick={() => formik.handleSubmit()}>
          Sign Up
        </Button>
        <p className="text-slate-900 text-center font-sans text-sm mt-8">
          Already have an account ?{" "}
          <Link href={"/auth/sign-in"} className="text-blue-800 hover:bg-blue-800 hover:text-white hover:px-2 hover:duration-100 hover:rounded-full hover:h-7 hover:ml-1"> Sign in here </Link>
        </p>
      </div>
    </div>  
  );
};

export default SignUpPage;
