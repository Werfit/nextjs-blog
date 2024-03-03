"use client";

import { useState } from "react";
import Portal from "@/components/portal/portal.component";
import InputWithLabel from "@/components/form/input-with-label.component";
import Quill from "@/components/quill/quill.component";
import FormSubmitButton from "@/components/form/form-submit-button.component";

const CreateArticleModal = () => {
  const [value, setValue] = useState("");

  return (
    <Portal targetId="modal">
      <div className="fixed bg-gray-950/10 h-screen w-screen top-0 left-0 flex items-center justify-center">
        <div className="container bg-white shadow-lg shadow-gray-500/20 rounded-md my-20 px-10 py-5 flex flex-col">
          <header className="flex items-center justify-between">
            <h3 className="text-gray-600 font-bold tracking-widest">
              Create article
            </h3>
            <button className="text-xl font-black">X</button>
          </header>
          <div className="h-0.5 bg-gray-900/10 mt-2 mb-5"></div>
          <main className="overflow-y-scroll flex-grow">
            <form
              action=""
              className="relative flex flex-col gap-2 overflow-y-scroll"
            >
              <InputWithLabel label="Title" isError={false} />

              <Quill value={value} onChange={setValue} />
              <FormSubmitButton>Create</FormSubmitButton>
            </form>
          </main>
        </div>
      </div>
    </Portal>
  );
};

export default CreateArticleModal;
