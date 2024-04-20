"use client";

import { AnimatePresence } from "framer-motion";
import { ChangeEvent, useEffect, useRef, useState } from "react";

import {
  deleteImage,
  uploadImage,
} from "@/actions/articles/image-upload.action";
import { useNotificationsContext } from "@/provider/notifications/notifications.hook";

import { Spinner } from "../../../../components/spinner/spinner.component";
import type { AvatarProps } from "./avatar.component";
import { Avatar } from "./avatar.component";

type AvatarUploaderProps = AvatarProps & {
  onLoad?: (url?: string) => Promise<void>;
  isDisabled?: boolean;
};

const AvatarUploader: React.FC<AvatarUploaderProps> = ({
  imageUrl,
  onLoad,
  isDisabled,
  ...props
}) => {
  const fileUploaderRef = useRef<HTMLInputElement>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(imageUrl);
  const [isLoading, setIsLoading] = useState(false);
  const { actions } = useNotificationsContext();

  useEffect(() => {
    setAvatarUrl(imageUrl);
  }, [imageUrl]);

  const onFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const image = event.target.files?.[0];
    setIsLoading(true);

    // no image was uploaded
    if (!image) {
      actions.error("No image");
      return;
    }

    const formData = new FormData();

    formData.append("file", image);

    if (imageUrl) {
      deleteImage(imageUrl).catch((error) =>
        console.error("Failed to delete previous avatar", error),
      );
    }
    const { url, message } = await uploadImage(formData);

    setIsLoading(false);
    if (url) {
      setAvatarUrl(url);
      onLoad?.(url);
    }

    if (message) {
      actions.error(message);
    }

    // on change is not always fired when the same file is being loaded twice in a row
    event.target.value = "";
  };

  const deleteAvatar = async () => {
    if (!avatarUrl) {
      return;
    }

    try {
      await deleteImage(avatarUrl);
      setAvatarUrl(undefined);
      onLoad?.(undefined);
    } catch (error) {
      actions.error("Failed to delete avatar");
    }
  };

  return (
    <div className="relative flex flex-col gap-4">
      {!isDisabled && (
        <input
          type="file"
          className="hidden"
          ref={fileUploaderRef}
          onChange={onFileUpload}
        />
      )}

      <AnimatePresence>
        {isLoading && (
          <Spinner
            className="flex h-8 w-8 fill-primary-500 text-lightGray-200"
            containerClassName="absolute flex items-center justify-center w-40 h-40 rounded-3xl bg-black-700/30"
          />
        )}
      </AnimatePresence>
      <Avatar imageUrl={avatarUrl} {...props} />

      {!isDisabled && (
        <div className="flex flex-col gap-2">
          <button
            className="rounded-md border-2 border-indigo-500 px-3 py-2 text-sm text-indigo-500 transition hover:bg-indigo-500/10 disabled:border-indigo-300 disabled:bg-indigo-50 disabled:text-indigo-300"
            onClick={() => fileUploaderRef.current?.click()}
            disabled={isLoading}
          >
            Change avatar
          </button>
          <button
            className="text-sm tracking-wide text-red-500 hover:text-red-400 disabled:text-red-300"
            onClick={deleteAvatar}
            disabled={isLoading}
          >
            Delete avatar
          </button>
        </div>
      )}
    </div>
  );
};

export { AvatarUploader };
