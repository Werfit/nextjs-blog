"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { createArticle } from "@/actions/articles/articles.action";
import { FeaturedImageUploader } from "@/components/editor/components/featured-image/uploader.component";
import { Editor } from "@/components/editor/editor.component";
import { sanitizeHtml } from "@/lib/sanitizer/sanitize-html";
import {
  CreateArticleSchema,
  createArticleSchema,
} from "@/schemas/article.schema";

const CreateArticle = () => {
  const { register, handleSubmit, setValue, watch, getValues } =
    useForm<CreateArticleSchema>({
      resolver: zodResolver(createArticleSchema),
    });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  watch();
  const handleArticleCreation: SubmitHandler<CreateArticleSchema> = async (
    result,
  ) => {
    setIsLoading(true);
    const data = new FormData();

    data.set("featuredImage", result.featuredImage);
    data.set("title", result.title);
    data.set("content", result.content);
    data.set("contentHtml", sanitizeHtml(result.contentHtml));

    // TODO: Redirect is taking to long
    try {
      await createArticle(data);
      router.push("/");
    } catch (err) {
      setIsLoading(false);
      const error = err as Error;
      console.log(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleArticleCreation)}
      className="flex flex-col gap-4"
    >
      <FeaturedImageUploader
        value={getValues("featuredImage")}
        onChange={(url) => setValue("featuredImage", url)}
      />

      <input
        placeholder="Untitled"
        className="w-full min-w-48 flex-1 bg-transparent text-4xl font-semibold tracking-widest text-gray-700 outline-0"
        {...register("title")}
      />

      <Editor
        onUpdate={(htmlValue, textValue) => {
          setValue("content", textValue);
          setValue("contentHtml", htmlValue);
        }}
        placeholder="Share you thoughts here!"
      />

      <button
        type="submit"
        className="rounded-md border-2 border-primary-500 px-4 py-2 tracking-wider text-primary-500 transition hover:bg-primary-500 hover:text-white disabled:border-primary-500/20 disabled:bg-primary-500/60 disabled:text-white"
        disabled={isLoading}
      >
        Submit
      </button>
    </form>
  );
};

export default CreateArticle;
