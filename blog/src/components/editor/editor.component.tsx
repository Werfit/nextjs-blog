"use client";

import "@/assets/styles/article.css";

import Blockquote from "@tiptap/extension-blockquote";
import Bold from "@tiptap/extension-bold";
import BulletList from "@tiptap/extension-bullet-list";
import Code from "@tiptap/extension-code";
import CodeBlock from "@tiptap/extension-code-block";
import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import Image from "@tiptap/extension-image";
import Italic from "@tiptap/extension-italic";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Paragraph from "@tiptap/extension-paragraph";
import Placeholder from "@tiptap/extension-placeholder";
import Text from "@tiptap/extension-text";
import { EditorProvider } from "@tiptap/react";
import { AnimatePresence } from "framer-motion";
import { Source_Code_Pro } from "next/font/google";
import { useState } from "react";

import { combineClassNames } from "@/utils/class-name.util";

import { allowedLevels } from "./common";
import { CharactersCounter } from "./components/characters-counter.component";
import { Toolbar } from "./components/toolbar.component";

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-source-code-pro",
});

type EditorProps = {
  onUpdate?: (htmlValue: string, textValue: string) => void;
  placeholder?: string;
};

const Editor: React.FC<EditorProps> = ({ placeholder, onUpdate }) => {
  const [isToolbarVisible, setIsToolbarVisible] = useState(false);

  return (
    <div className={combineClassNames(sourceCodePro.variable)}>
      <EditorProvider
        extensions={[
          Text,
          Bold,
          Italic,
          Paragraph,
          Blockquote,
          Code,
          CodeBlock,
          ListItem,
          OrderedList,
          BulletList,
          Document,
          Placeholder.configure({
            placeholder,
            considerAnyAsEmpty: true,
          }),
          Heading.configure({
            levels: allowedLevels,
          }),
          Image.configure({
            inline: false,
          }),
        ]}
        onUpdate={({ editor }) => {
          onUpdate?.(editor.getHTML(), editor.getText());
        }}
        slotAfter={<CharactersCounter />}
        editorProps={{
          attributes: {
            class: "article",
          },
        }}
        onFocus={() => setIsToolbarVisible(true)}
        onBlur={() => setIsToolbarVisible(false)}
      >
        <AnimatePresence>
          {isToolbarVisible && (
            <Toolbar
              className="fixed bottom-5 left-1/2 mx-auto -translate-x-1/2 rounded-md bg-white shadow-md shadow-black-700/10"
              onMouseDown={(e) => e.preventDefault()}
            />
          )}
        </AnimatePresence>
      </EditorProvider>
    </div>
  );
};

export { Editor };
