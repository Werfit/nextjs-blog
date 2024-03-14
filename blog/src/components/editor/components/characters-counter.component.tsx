"use client";
import { useCurrentEditor } from "@tiptap/react";

const CharactersCounter = () => {
  const { editor } = useCurrentEditor();

  return (
    <p className="text-sm text-right text-gray-500">
      {editor?.getText()?.length ?? 0} characters
    </p>
  );
};

export { CharactersCounter };
