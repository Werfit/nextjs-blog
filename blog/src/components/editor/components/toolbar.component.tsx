import { useCurrentEditor } from "@tiptap/react";
import { motion } from "framer-motion";
import { MouseEventHandler } from "react";

import { Divider } from "@/components/divider/divider.component";
import { Icon } from "@/components/icon/icon.component";
import { ANIMATION_CONFIG } from "@/constants/animation.constants";
import { useAnimationOnInitAndCleanup } from "@/hooks/use-animation-on-init-cleanup.hook";
import { combineClassNames } from "@/utils/class-name.util";

import { allowedLevels, HeaderDropdownActions } from "../common";
import { DropdownIcon } from "./dropdown/dropdown-icon-button.component";
import { ImageLoader } from "./image-loader.component";

type ToolbarProps = {
  onMouseDown?: MouseEventHandler<HTMLDivElement>;
  className?: string;
};

const Toolbar: React.FC<ToolbarProps> = ({ onMouseDown, className }) => {
  const { editor } = useCurrentEditor();
  const { scope } = useAnimationOnInitAndCleanup<HTMLDivElement>({
    onEnter: async (scope, animate) => {
      await animate(scope.current, { opacity: 1 }, ANIMATION_CONFIG);
    },
    onExit: async (scope, animate) => {
      await animate(scope.current, { opacity: 0 }, ANIMATION_CONFIG);
    },
  });

  return (
    <motion.div
      className={combineClassNames(
        "grid grid-rows-2 items-center sm:flex sm:gap-2",
        className,
      )}
      onMouseDown={onMouseDown}
      ref={scope}
      initial={{ opacity: 0 }}
    >
      <div className="flex items-center">
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
        <div className="flex items-center">
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
              disabled={
                !editor?.can().chain().focus().toggleOrderedList().run()
              }
            >
              <Icon name="format_list_numbered" />
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Divider className="hidden sm:inline" />
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
    </motion.div>
  );
};

export { Toolbar };
