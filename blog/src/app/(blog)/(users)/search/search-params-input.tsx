"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Input } from "@/components/form/debounce-input.component";

type SearchParamsInputProps = {
  defaultValue: string;
};

export const SearchParamsInput: React.FC<SearchParamsInputProps> = ({
  defaultValue,
}) => {
  const [username, setUsername] = useState(defaultValue);
  const router = useRouter();

  useEffect(() => {
    const searchParams = new URLSearchParams();
    if (username && username.length > 0) {
      searchParams.set("username", username);
    }

    router.push(`?${searchParams.toString()}`);
  }, [username, router]);

  return (
    <Input
      className="w-full rounded-md bg-white px-6 py-4 text-base font-medium tracking-wider shadow-md shadow-black-700/10 outline-none transition focus:shadow-xl"
      placeholder="Type in username..."
      onChange={(value) => setUsername(value?.toString() ?? "")}
      defaultValue={username}
    />
  );
};
