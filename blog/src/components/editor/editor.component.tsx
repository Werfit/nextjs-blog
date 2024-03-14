"use client";

import { EditorProvider } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import Heading from "@tiptap/extension-heading";
import Image from "@tiptap/extension-image";
import Blockquote from "@tiptap/extension-blockquote";
import Text from "@tiptap/extension-text";
import Italic from "@tiptap/extension-italic";
import Paragraph from "@tiptap/extension-paragraph";
import Code from "@tiptap/extension-code";
import CodeBlock from "@tiptap/extension-code-block";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import BulletList from "@tiptap/extension-bullet-list";
import Document from "@tiptap/extension-document";
import { Source_Code_Pro } from "next/font/google";

import "./style.css";
import { allowedLevels } from "./common";
import Bold from "@tiptap/extension-bold";
import { Toolbar } from "./components/toolbar.component";
import { CharactersCounter } from "./components/characters-counter.component";

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-source-code-pro",
});

type EditorProps = {
  // eslint-disable-next-line no-unused-vars
  onUpdate?: (htmlValue: string, textValue: string) => void;
  placeholder?: string;
};

const Editor: React.FC<EditorProps> = ({ placeholder, onUpdate }) => {
  return (
    <div className={sourceCodePro.variable}>
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
      >
        <Toolbar className="fixed mx-auto bg-white shadow-md shadow-black-700/10 bottom-5 rounded-md left-1/2 -translate-x-1/2" />
      </EditorProvider>
    </div>
  );
};

export { Editor };
