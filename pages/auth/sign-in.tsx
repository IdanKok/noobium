import Head from "next/head";
import Button from "../../components/Button";
import NavBar from "../../components/NavBar";
import TextInput from "../../components/TextInput";
import { useFormik, Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import Loading from "react-spinners/BeatLoader";
import useSignInMutation from "../../hooks/mutations/use-sign-in-mutation";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import useGoogleSignInMutation from "../../hooks/mutations/use-google-sign-in-mutation";


const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email Format Is Invalid")
    .required("Email Is Required"),
    password: Yup.string().required("Password Is Required"),
});

const SignInPage = () => {
  const signInMutation = useSignInMutation()
  const router = useRouter()
  const queryClient = useQueryClient()
  const refGoogleButton = useRef<HTMLDivElement>(null)
  const googleSignInMutation = useGoogleSignInMutation()

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SignInSchema,
    onSubmit: async(values) => {
     try {
      const response = await signInMutation.mutateAsync({
        email: values.email,
        password: values.password,
      });
     
      queryClient.setQueryData(['user'], response.user)
      localStorage.setItem('access_token', response.access_token.token)
      router.push("/")
     } catch (error) {
        toast.error('Email or Password is Invalid !')
     }
    },
  });

  const callback = async (googleResponse: any) => {
    try {
      const response = await googleSignInMutation.mutateAsync({
        token: googleResponse.credential
      });

   
   
      queryClient.setQueryData(['user'], response.user)
      localStorage.setItem('access_token', response.access_token.token)
      console.log('datanya', response)
      router.push("/")
     } catch (error) {
     
        toast.error('Failed to sign in with google !')
        console.log(error)
     }
  }

  useEffect(() =>  {
    const clientId = "966958136435-ubht832lb5u37gri84f5anjrrdcr1noi.apps.googleusercontent.com"

    try {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback,
      })
      
      
      window.google.accounts.id.renderButton(refGoogleButton.current, {
        theme: 'outline',
        size: 'large',
        shape: 'pill',
        width: 400,
      })
    } catch (error) {
      location.reload()
    }

    

   
  }, [])


  return (
    
    <div>
      <Head>
        <title>Sig In | Noobium</title>
        <script src="https://accounts.google.com/gsi/client" async defer/>
      </Head>
   
      {/* <script src="https://apis.google.com/js/platform.js" async defer></script> */}
      <NavBar />
      {signInMutation.isLoading || googleSignInMutation.isLoading &&(
        <div className=" h-screen flex justify-center items-center">
          <Loading size={16} color="rgb(30 64 175)"/>
        </div>
      )}
      {!signInMutation.isLoading && !googleSignInMutation.isLoading &&(
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

        <Button type="button" size="large" isFullWidth onClick={() => formik.handleSubmit()}>
          Sign In
        </Button>
        <div className="border-b my-8"/>
        <div ref={refGoogleButton}/>
        <div className="border-b my-8"/>
      
        <p className="text-slate-900 text-center font-sans text-sm mt-8">
          Don't have an account ?
          <Link href={"/auth/sign-up"} className="text-blue-800 hover:bg-blue-800 hover:text-white hover:px-2 hover:duration-100 hover:rounded-full hover:h-7 hover:ml-1"> Sign up here </Link>
        </p>
      
      </div>
      )}
    </div>
  );
  
};

export default SignInPage;
