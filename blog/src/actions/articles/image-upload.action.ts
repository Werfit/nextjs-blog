"use server";

import { put, del } from "@vercel/blob";
import { auth } from "../user/helpers/auth";

export const deleteImage = async (url: string) => {
  if (!(await auth())) {
    throw new Error("Not authenticated");
  }

  try {
    await del(url);
  } catch (error) {
    console.log(error);
  }
};

export const uploadImage = async (data: FormData) => {
  if (!(await auth())) {
    throw new Error("Not authenticated");
  }

  const image = data.get("file") as File;

  try {
    const filenameLexemes = image.name.split(".");
    const filename = filenameLexemes.slice(0, -1).join(".");
    const extension = filenameLexemes[filenameLexemes.length - 1];

    const name = `${filename}-${Date.now()}.${extension}`;
    // const { url } = await put(name, image, {
    //   access: "public",
    // });

    return {
      url: "https://images.unsplash.com/photo-1709936863104-b0249fe18c41?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    };
  } catch (err) {
    const error = err as Error;
    return { message: error.message };
  }
};
