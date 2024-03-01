import { useRef, forwardRef } from "react";
import dynamic from "next/dynamic";
import ReactQuillOriginal, { ReactQuillProps } from "react-quill";
import { request } from "@/services/http.service";

import "react-quill/dist/quill.snow.css";
import "./style.css";

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    // eslint-disable-next-line react/display-name
    return forwardRef<ReactQuillOriginal, ReactQuillProps>((props, ref) => (
      <RQ ref={ref} {...props} />
    ));
  },
  { ssr: false },
);

const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  },
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

const Quill: React.FC<ReactQuillProps> = (props) => {
  const quillRef = useRef<ReactQuillOriginal>(null);

  const imageHandler = () => {
    const input = document.createElement("input");

    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files && input.files[0];
      const formData = new FormData();

      if (!file) {
        return;
      }

      const editor = quillRef?.current?.getEditor();
      console.log(editor);

      if (!editor) {
        return;
      }

      formData.append("file", file);

      try {
        const { url } = await request<{ url: string }>(
          "/api/blog",
          "PUT",
          formData,
        );

        const range = editor.getSelection();

        editor.insertEmbed(range?.index ?? 0, "image", url);
      } catch (err) {
        const error = err as Error;
        console.log(error);
      }
    };
  };

  return (
    <ReactQuill
      {...props}
      ref={quillRef}
      theme="snow"
      modules={{
        ...modules,
        toolbar: {
          ...modules.toolbar,
          handlers: {
            image: imageHandler,
          },
        },
      }}
      formats={formats}
    />
  );
};

export default Quill;
