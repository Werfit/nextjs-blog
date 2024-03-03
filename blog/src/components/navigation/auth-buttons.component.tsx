"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const AuthButtons = () => {
  const session = useSession();

  if (session.status === "authenticated") {
    return (
      <>
        <span className="text-gray-500 text-sm tracking-widest">
          {session.data?.user.username}
        </span>

        <button
          className="rounded px-4 py-2 border border-amber-500 text-amber-500 transition hover:bg-amber-500 hover:text-white"
          onClick={() => signOut({ redirect: false })}
        >
          Log out
        </button>
      </>
    );
  }

  return (
    <>
      <Link
        href="/auth"
        className="px-6 py-2 bg-primary-500 text-white hover:bg-primary-400 font-medium tracking-wider transition rounded-md"
      >
        Sign In
      </Link>
    </>
  );
};

export { AuthButtons };
