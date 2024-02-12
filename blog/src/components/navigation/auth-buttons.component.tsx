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
        href="/login"
        className="block rounded px-4 py-2 border border-emerald-500 text-emerald-500 transition hover:bg-emerald-500 hover:text-white"
      >
        Login
      </Link>
      <Link
        href="/signup"
        className="text-rose-500 transition hover:text-rose-700"
      >
        Sign up
      </Link>
    </>
  );
};

export default AuthButtons;
