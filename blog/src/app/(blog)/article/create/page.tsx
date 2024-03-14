"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { createArticle } from "@/actions/articles/articles.action";
import { Editor } from "@/components/editor/editor.component";
import {
  CreateArticleSchema,
  createArticleSchema,
} from "@/schemas/article.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { sanitizeHtml } from "@/lib/sanitizer/sanitize-html";
import { FeaturedImageUploader } from "@/components/editor/components/featured-image/uploader.component";

const CreateArticle = () => {
  const { register, handleSubmit, setValue, watch, getValues } =
    useForm<CreateArticleSchema>({
      resolver: zodResolver(createArticleSchema),
    });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  watch();
  const handleArticleCreation: SubmitHandler<CreateArticleSchema> = async (
    result
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
    } finally {
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

      <div className="flex items-center gap-2 flex-wrap">
        <input
          placeholder="Untitled"
          className="w-full text-4xl font-semibold tracking-widest outline-0 text-gray-700 flex-1 min-w-48"
          {...register("title")}
        />

        <button
          type="submit"
          className="border-2 border-primary-500 px-4 py-2 tracking-wider text-primary-500 rounded-md hover:bg-primary-500 hover:text-white transition disabled:bg-primary-500/10"
          disabled={isLoading}
        >
          Submit
        </button>
      </div>

      <Editor
        onUpdate={(htmlValue, textValue) => {
          setValue("content", textValue);
          setValue("contentHtml", htmlValue);
        }}
        placeholder="Share you thoughts here!"
      />
    </form>
  );
};

export default CreateArticle;
