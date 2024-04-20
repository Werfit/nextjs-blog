"use client";
import { useCurrentEditor } from "@tiptap/react";

const CharactersCounter = () => {
  const { editor } = useCurrentEditor();

  return (
    <p className="text-right text-sm text-gray-500">
      {editor?.getText()?.length ?? 0} characters
    </p>
  );
};

export { CharactersCounter };
