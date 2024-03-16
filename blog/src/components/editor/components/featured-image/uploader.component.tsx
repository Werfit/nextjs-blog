"use client";
import { ChangeEvent, useState } from "react";

import { FeaturedImageDisplay, LoadingStatus } from "./display.component";
import {
  deleteImage,
  uploadImage,
} from "@/actions/articles/image-upload.action";

type FeaturedImageUploaderProps = {
  value: string | undefined;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string) => void;
};

const FeaturedImageUploader: React.FC<FeaturedImageUploaderProps> = ({
  value,
  onChange,
}) => {
  const [loadingStatus, setLoadingStatus] = useState(
    value ? LoadingStatus.LOADED : LoadingStatus.NONE,
  );

  // TODO: Add file deletion on absence of submit
  const onFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const image = event.target.files?.[0];

    // no image was uploaded
    if (!image) {
      console.log("no image");
      return;
    }

    if (value) {
      deleteImage(value).catch(() =>
        console.log("Failed to delete previous featured image"),
      );
    }

    setLoadingStatus(LoadingStatus.LOADING);

    const formData = new FormData();

    formData.append("file", image);
    const { url, message } = await uploadImage(formData);

    if (url) {
      onChange(url);
      setLoadingStatus(LoadingStatus.LOADED);
    }

    if (message) {
      console.log(message);
    }
  };

  return (
    <label className="flex h-64 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-md bg-gray-100 text-lg font-bold text-gray-500 transition">
      <input
        type="file"
        className="hidden"
        onChange={onFileUpload}
        accept=".jpg,.png"
      />

      <FeaturedImageDisplay status={loadingStatus} featuredImageSrc={value} />
    </label>
  );
};

export { FeaturedImageUploader };
