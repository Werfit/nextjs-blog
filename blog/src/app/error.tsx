"use client";

import { Lato } from "next/font/google";
import { Navigation } from "@/components/navigation/navigation.component";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export default function ErrorPage({ error, reset }: ErrorProps) {
  return (
    <main className="container mx-auto flex min-h-screen flex-col">
      <Navigation />
      <div
        className="flex flex-1 flex-col items-center justify-center gap-10"
        style={lato.style}
      >
        <div>
          <p className="text-black-600 text-center text-4xl font-bold tracking-widest">
            We are sorry 🥺
          </p>
          <p className="text-black-600 text-center tracking-wider">
            {error.message}
          </p>
        </div>

        <div className="flex w-64 flex-col items-stretch gap-2 text-center">
          You might want to try again 👉👈
          <button
            className="rounded-full bg-purple-500 px-4 py-2 text-xl text-white transition hover:bg-purple-400"
            onClick={reset}
          >
            Retry
          </button>
        </div>
      </div>
    </main>
  );
}
