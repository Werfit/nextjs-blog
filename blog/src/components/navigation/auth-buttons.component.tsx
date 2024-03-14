"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { ProfileButton } from "@/components/navigation/profile-button.component";

const AuthButtons = () => {
  const session = useSession();

  return session.status === "authenticated" ? (
    <ProfileButton user={session.data.user} />
  ) : (
    <Link
      href="/auth"
      className="px-6 py-2 bg-primary-500 text-white hover:bg-primary-400 font-medium tracking-wider transition rounded-md"
    >
      Sign In
    </Link>
  );
};

export { AuthButtons };
