import Head from "next/head";
import type { NextPage } from "next";
import NavBar from "../../components/NavBar";
import ThumbnailPicker from "../../components/ThumbnailPicker";
import { useEffect, useRef } from "react";
import Category from "../../components/Category";
import { useFormik } from "formik";
import * as Yup from "yup";

type FormValues = {
  title: string
  content: string
  thumbnail: File | null
  categoryId: number | null
}

const EditArticleSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
  categoryId: Yup.number().nullable().required("Category is required"),
});

const EditArticlePage: NextPage = () => {

  const categories = [...Array(10)].map((_, index) => {
    return {
      id: index + 1,
      slug: "technology",
      name: "Technology",
    };
  });

  const refContentInput = useRef<HTMLTextAreaElement>(null);

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
    onSubmit: () => {
      alert("Submitted !");
    },
  });

  const article = {
    id: 1,
    slug: "how to learn redux",
    title: "How to Learn Redux",
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer et nibh egestas suspendisse nulla ipsum etiam gravida. Est eu, sed tortor in rutrum in. Egestas
    
    tincidunt sed venenatis faucibus sed. Arcu dictum lobortis pellentesque purus massa. Cras hendrerit blandit sed at. Euismod praesent ultrices sit cursus molestie ac. Amet, pellentesque interdum etiam tortor, dui. Quam cras quis condimentum amet, rhoncus diam, dictumst. Platea eu sodales vitae ipsum ac. Auctor etiam sagittis faucibus non pharetra elit.\n\n
     Malesuada massa pellentesque nunc diam neque. Consequat sollicitudin purus in egestas egestas commodo non tempus. Praesent lorem est, quis tincidunt varius. Quisque facilisis dignissim scelerisque nunc senectus rhoncus massa sollicitudin id.
     Ornare viverra neque vitae gravida habitasse tellus ultrices. Id blandit ut sed sed aliquam vitae. Eu nibh dignissim rutrum sit blandit. Quisque libero commodo, cursus est cursus. Cursus varius eget velit consectetur vel potenti.\n\n
     Ipsum molestie erat laoreet in pharetra. Rhoncus, netus malesuada velit felis proin sem. Aliquet dictum sagittis a ornare lacus sed ut. Aenean vitae convallis in adipiscing. At dictumst sagittis, tincidunt pellentesque scelerisque pellentesque sem auctor. Ultricies urna sit in ac sed arcu turpis. Feugiat elit quam pulvinar elementum, turpis auctor ornare leo, neque.\n\n
     Est interdum sed amet integer libero tincidunt. Mauris, nunc sapien, donec placerat massa. Tellus proin tortor, hendrerit sed vitae. Lectus aliquet purus elementum at et. Adipiscing imperdiet lacus eget aenean risus egestas malesuada lobortis pulvinar.
     Ut at rhoncus suspendisse non sed nec viverra. Cursus vitae adipiscing morbi vitae. Ultricies non neque, sed pulvinar sit amet, nunc. Bibendum vitae et ac cras nulla mi id amet. A viverra sed gravida id dictum.`,
    thumbnail: "/images/dummy-thumbnail.png",
    category: {
      id: 1,
      name: "Technology",
    },
    date: "2022-09-20 16:00:00",
    author: {
      name: "John Doe",
      photo: "/images/dummy-avatar.png",
    },
  };

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
      title: article.title,
      content: article.content,
      thumbnail: null,
      categoryId: article.category.id,
    });

    setTimeout(() => {
      handleContentInputGrow()
    }, 200)
  }, []);

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
          preview={article.thumbnail}
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
            {categories.map((category) => (
              <Category
                key={category.id}
                label={category.name}
                isSelected={formik.values.categoryId === category.id}
                onClick={() => formik.setFieldValue("categoryId", category.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditArticlePage;
