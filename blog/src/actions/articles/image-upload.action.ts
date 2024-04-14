"use server";

import { URL } from "node:url";

import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

import { env } from "@/env/env";

import { auth } from "../user/helpers/auth";

const client = new S3Client({
  region: env.storage.region,
  credentials: {
    accessKeyId: env.storage.accessKey,
    secretAccessKey: env.storage.secretKey,
  },
});

export const deleteImage = async (url: string) => {
  const session = await auth();
  if (!session) {
    throw new Error("Not authenticated");
  }

  if (!url) {
    throw new Error("URL was not provided");
  }

  try {
    const fileUrl = new URL(url);
    // fileUrl.pathname returns string with a leading slash `/pathname`
    const itemKey = fileUrl.pathname.slice(1);

    const deleteCommand = new DeleteObjectCommand({
      Bucket: env.storage.bucketName,
      Key: itemKey,
    });

    await client.send(deleteCommand);
  } catch (error) {
    console.log(error);
  }
};

export const uploadImage = async (data: FormData) => {
  const session = await auth();
  if (!session) {
    throw new Error("Not authenticated");
  }

  const image = data.get("file") as File;

  if (!image) {
    throw new Error("Image was not provided");
  }

  try {
    const filenameLexemes = image.name.split(".");
    const filename = filenameLexemes.slice(0, -1).join(".");
    const extension = filenameLexemes[filenameLexemes.length - 1];

    const name = `${filename}-${Date.now()}.${extension}`;
    const type = image.type;

    const uploadCommand = new PutObjectCommand({
      Bucket: env.storage.bucketName,
      Body: Buffer.from(await image.arrayBuffer()),
      Key: name,
      ACL: "public-read",
      ContentType: type,
    });

    await client.send(uploadCommand);
    const url = `https://${env.storage.bucketName}.s3.${env.storage.region}.amazonaws.com/${name}`;

    return {
      url: url,
    };
  } catch (err) {
    const error = err as Error;
    return { message: error.message };
  }
};
