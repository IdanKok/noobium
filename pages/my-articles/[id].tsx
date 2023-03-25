import Head from "next/head";
import type { NextPage } from "next";
import NavBar from "../../components/NavBar";
import ThumbnailPicker from "../../components/ThumbnailPicker";
import { useEffect, useRef } from "react";
import Category from "../../components/Category";
import { useFormik } from "formik";
import * as Yup from "yup";
import Loading from "react-spinners/BeatLoader";
import Link from "next/link";

import { useRouter } from "next/router";
import useMyArticleDetailQuery from "../../hooks/queries/use-my-article-detail.query";
import useCategoriesQuery from "../../hooks/queries/use-categories-query";
import useEditArticleMutation from "../../hooks/mutations/use-edit-article-mutation";
import { toast } from "react-hot-toast";

type FormValues = {
  title: string;
  content: string;
  thumbnail: File | null;
  categoryId: number | null;
};

const EditArticleSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
  categoryId: Yup.number().nullable().required("Category is required"),
});

const EditArticlePage: NextPage = () => {
  const refContentInput = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  const myArticleDetailQuery = useMyArticleDetailQuery(router.query.id as string);
  const categoriesQuery = useCategoriesQuery();
  const editArticleMutation = useEditArticleMutation()
  
  const initialValues: FormValues = {
    title: "",
    content: "",
    thumbnail: null,
    categoryId: null,
  };

  const formik = useFormik({
    initialValues,
    validationSchema: EditArticleSchema,
    validateOnMount: true,
    onSubmit: async (values) => {
      if(!values.categoryId || !myArticleDetailQuery.data?.id) return
      try {
         await editArticleMutation.mutateAsync({
          id: myArticleDetailQuery.data?.id,
          title: values.title,
          content: values.content,
          featured_image: values.thumbnail,
          category_id: values.categoryId,
        });

        router.push("/my-articles");
        toast.success("Update an Article Succesfull !");
      } catch (error) {
        toast.error("Failed to update an Article !");
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

  useEffect(() => {
    formik.setValues({
      title: myArticleDetailQuery.data?.title || '',
      content: myArticleDetailQuery.data?.content || '',
      thumbnail: null,
      categoryId: myArticleDetailQuery.data?.category_id || null,
    });

    setTimeout(() => {
      handleContentInputGrow();
    }, 200);
  }, [myArticleDetailQuery.data]);

  return (
    <div>
      <Head>
        <title>Edit Article || Noobium</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar
        hasSearchInput={false}
        hasSubmitButton={true}
        isSubmitDisabled={hasError}
        submitLabel="Publish"
        onClickSubmit={formik.handleSubmit}
      />
      <div className="w-[720px] mx-auto py-24">
        <input
          className="font-sans font-bold placeholder-slate-200 text-5xl outline-none text-slate-900 w-full mb-12"
          placeholder="Title"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
        />
        <ThumbnailPicker
          preview={myArticleDetailQuery.data?.featured_image}
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
          <p className="font-sans text-sm text-slate-900 mb-4">
            Choose a Category
          </p>
          <div className="flex flex-wrap gap-3 ">
          {categoriesQuery.isSuccess && (
          <>
          
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
      </div>
    </div>
  );
};

export default EditArticlePage;
