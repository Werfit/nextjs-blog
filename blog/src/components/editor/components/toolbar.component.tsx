import { Editor, useCurrentEditor } from "@tiptap/react";
import { Icon } from "@/components/icon/icon.component";
import { DropdownIcon } from "./dropdown-icon-button.component";
import { ImageLoader } from "./image-loader.component";
import { allowedLevels, HeaderDropdownActions } from "../common";
import { Divider } from "@/components/divider/divider.component";

type ToolbarProps = {
  // editor: Editor;
  className?: string;
};

const Toolbar: React.FC<ToolbarProps> = ({ className }) => {
  const { editor } = useCurrentEditor();

  return (
    <div className={`flex items-center gap-2 ${className ?? ""}`}>
      <DropdownIcon
        className="rounded-md px-2 transition hover:bg-gray-100"
        name="title"
        actions={HeaderDropdownActions}
        onClick={(level) =>
          allowedLevels.includes(level)
            ? editor?.chain().focus().toggleHeading({ level }).run()
            : editor?.chain().focus().clearNodes().run()
        }
      />

      <Divider />
      <div className="flex items-center">
        <button
          type="button"
          className="rounded-md px-2 transition hover:bg-gray-100"
          onClick={() => editor?.chain().focus().toggleBold().run()}
          disabled={!editor?.can().chain().focus().toggleBold().run()}
        >
          <Icon name="format_bold" />
        </button>
        <button
          type="button"
          className="rounded-md px-2 transition hover:bg-gray-100"
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          disabled={!editor?.can().chain().focus().toggleItalic().run()}
        >
          <Icon name="format_italic" />
        </button>
        <button
          type="button"
          className="rounded-md px-2 transition hover:bg-gray-100"
          onClick={() => editor?.chain().focus().toggleBlockquote().run()}
          disabled={!editor?.can().chain().focus().toggleBlockquote().run()}
        >
          <Icon name="format_quote" />
        </button>
      </div>

      <Divider />
      <div className="flex items-center">
        <button
          type="button"
          className="rounded-md px-2 transition hover:bg-gray-100"
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          disabled={!editor?.can().chain().focus().toggleBulletList().run()}
        >
          <Icon name="format_list_bulleted" />
        </button>
        <button
          type="button"
          className="rounded-md px-2 transition hover:bg-gray-100"
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          disabled={!editor?.can().chain().focus().toggleOrderedList().run()}
        >
          <Icon name="format_list_numbered" />
        </button>
      </div>
      <Divider />
      <ImageLoader
        className="rounded-md px-2 transition hover:bg-gray-100"
        onLoad={(content) =>
          editor
            ?.chain()
            .focus()
            .setImage({ src: content as string })
            .run()
        }
      />

      <Divider />
      <div className="flex items-center">
        <button
          type="button"
          className="rounded-md px-2 transition hover:bg-gray-100"
          onClick={() => editor?.chain().focus().toggleCode().run()}
          disabled={!editor?.can().chain().focus().toggleCode().run()}
        >
          <Icon name="code" />
        </button>
        <button
          type="button"
          className="rounded-md px-2 transition hover:bg-gray-100"
          onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
          disabled={!editor?.can().chain().focus().toggleCodeBlock().run()}
        >
          <Icon name="integration_instructions" />
        </button>
      </div>
    </div>
  );
};

export { Toolbar };
