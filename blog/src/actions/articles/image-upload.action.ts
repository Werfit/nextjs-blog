"use server";

import { put, del } from "@vercel/blob";

export const deleteImage = async (url: string) => {
  try {
    await del(url);
  } catch (error) {
    console.log(error);
  }
};

export const uploadImage = async (data: FormData) => {
  const image = data.get("file") as File;

  try {
    const filenameLexemes = image.name.split(".");
    const filename = filenameLexemes.slice(0, -1).join(".");
    const extension = filenameLexemes[filenameLexemes.length - 1];

    const name = `${filename}-${Date.now()}.${extension}`;
    const { url } = await put(name, image, {
      access: "public",
    });

    return { url };
  } catch (err) {
    const error = err as Error;
    return { message: error.message };
  }
};
