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
    <main className="container mx-auto flex flex-col min-h-screen">
      <Navigation />
      <div
        className="flex-1 flex flex-col justify-center items-center gap-10"
        style={lato.style}
      >
        <div>
          <p className="text-center text-4xl tracking-widest text-black-600 font-bold">
            We are sorry 🥺
          </p>
          <p className="text-center tracking-wider text-black-600">
            {error.message}
          </p>
        </div>

        <div className="flex flex-col items-stretch gap-2 w-64 text-center">
          You might want to try again 👉👈
          <button
            className="bg-purple-500 text-white rounded-full px-4 py-2 text-xl hover:bg-purple-400 transition"
            onClick={reset}
          >
            Retry
          </button>
        </div>
      </div>
    </main>
  );
}
