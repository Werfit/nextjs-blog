import { ChangeEvent, useRef } from "react";

import { uploadImage } from "@/actions/articles/image-upload.action";
import { Icon } from "@/components/icon/icon.component";

type ImageLoaderProps = {
  className?: string;
  onLoad: (content: string | ArrayBuffer) => void;
};

const ImageLoader: React.FC<ImageLoaderProps> = ({ className, onLoad }) => {
  const fileUploaderRef = useRef<HTMLInputElement>(null);

  const onFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const image = event.target.files?.[0];

    // no image was uploaded
    if (!image) {
      console.log("no image");
      return;
    }

    const localUrl = URL.createObjectURL(image);
    onLoad(localUrl);

    const formData = new FormData();

    formData.append("file", image);
    const { url, message } = await uploadImage(formData);

    if (url) {
      onLoad(url);
    }

    if (message) {
      console.log(message);
    }

    // on change is not always fired when the same file is being loaded twice in a row
    event.target.value = "";
  };

  return (
    <button
      type="button"
      className={className}
      onClick={() => fileUploaderRef.current?.click()}
    >
      <input
        type="file"
        className="hidden"
        ref={fileUploaderRef}
        onChange={onFileUpload}
      />
      <Icon name="photo_library" />
    </button>
  );
};

export { ImageLoader };
