import Head from "next/head";
import type { NextPage } from "next";
import NavBar from "../../components/NavBar";
import ThumbnailPicker from "../../components/ThumbnailPicker";
import { useRef } from "react";
import Category from "../../components/Category";
import { useFormik } from "formik";
import Loading from "react-spinners/BeatLoader";


import * as Yup from "yup";
import { useRouter } from "next/router";
import useCreateArticleMutation from "../../hooks/mutations/use-create-article-mutation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import useCategoriesQuery from "../../hooks/queries/use-categories-query";

const CreateArticleSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
  thumbnail: Yup.mixed().nullable().required("Thumbnail is required"),
  categoryId: Yup.number().nullable().required("Category is required"),
});

const CreateArticlePage: NextPage = () => {
  const refContentInput = useRef<HTMLTextAreaElement>(null);
  const router = useRouter()
  const createArticleMutation = useCreateArticleMutation()
  const categoriesQuery = useCategoriesQuery();

  const categories = [...Array(10)].map((_, index) => {
    return {
      id: index + 1,
      slug: "technology",
      name: "Technology",
    };
  });

  

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      thumbnail: null,
      categoryId: null,
    },
    validationSchema: CreateArticleSchema,
    validateOnMount: true,
     onSubmit: async (values) => {
      if(!values.categoryId || !values.thumbnail) return
      try {
         await createArticleMutation.mutateAsync({
          title: values.title,
          content: values.content,
          featured_image: values.thumbnail,
          category_id: values.categoryId,
        });

        router.push("/my-articles");
        toast.success("Create Article Succesfull !");
      } catch (error) {
        toast.error("Failed to create an Article !");
      }
    },
  });

  const hasError =
    !!formik.errors.title ||
    !!formik.errors.content ||
    !!formik.errors.thumbnail ||
    !!formik.errors.categoryId;

  const handleContentInputGrow = () => {
    if (!refContentInput.current) return;

    refContentInput.current.style.height = "auto";
    refContentInput.current.style.height =
      refContentInput.current.scrollHeight + "px";
  };

  return (
    <div>
      <Head>
        <title>Create Article || Noobium</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar
        hasSearchInput={false}
        hasSubmitButton={true}
        isSubmitDisabled={hasError}
        submitLabel="Publish"
        onClickSubmit={formik.handleSubmit}
      />
      {createArticleMutation.isLoading && (
        <div className=" h-screen flex justify-center items-center">
          <Loading size={16} color="rgb(30 64 175)" />
        </div>
      )}
      {!createArticleMutation.isLoading && (
      <div className="w-[720px] mx-auto py-24">
        <input
          className="font-sans font-bold placeholder-slate-200 text-5xl outline-none text-slate-900 w-full mb-12"
          placeholder="Title"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
        />
        <ThumbnailPicker
          onPick={(file) => formik.setFieldValue("thumbnail", file)}
        />
        <textarea
          ref={refContentInput}
          className="w-full placeholder-slate-400 resize-none outline-none mt-12 font-serif"
          placeholder="Write an article here..."
          onInput={handleContentInputGrow}
          name="content"
          value={formik.values.content}
          onChange={formik.handleChange}
        />

        <div className="pt-12 border-t border-slate-200 mt-40">
        {categoriesQuery.isSuccess && (
          <>
          <p className="font-sans text-sm text-slate-900 mb-4">
            Choose a Category
          </p>
          <div className="flex flex-wrap gap-3 ">
            {categoriesQuery.data.map((category) => (
              <Category
                key={category.id}
                label={category.slug}
                isSelected={formik.values.categoryId === category.id}
                onClick={() => formik.setFieldValue("categoryId", category.id)}
              />
            ))}
             {categoriesQuery.isLoading && (
            <div className="flex justify-center">
              <Loading size={16} color={"rgb(30 64 175)"} />
            </div>
          )}
          </div>
          </>
        )}
        </div>
      </div>
      )}
    </div>
  );
};

export default CreateArticlePage;
