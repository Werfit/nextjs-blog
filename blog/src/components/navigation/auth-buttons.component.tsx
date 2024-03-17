"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { ProfileIconButton } from "./profile-button/icon.component";

type AuthButtonsProps = {
  className?: string;
};

const AuthButtons: React.FC<AuthButtonsProps> = ({ className }) => {
  const session = useSession();

  return session.status === "authenticated" ? (
    <ProfileIconButton className={className} user={session.data.user} />
  ) : (
    <Link
      href="/auth"
      className={`rounded-md bg-primary-500 px-6 py-2 font-medium tracking-wider text-white transition hover:bg-primary-400 ${className ?? ""}`}
    >
      Sign In
    </Link>
  );
};

export { AuthButtons };
