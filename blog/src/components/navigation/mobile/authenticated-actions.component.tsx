"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

import { FavoritesIcon } from "@/components/favorites/favorites-icon.component";
import { Search } from "@/components/search/search-icon.component";

import { ProfileIconButton } from "../profile-button/icon.component";

type AuthenticatedActionsProps = {
  className?: string;
  onClose: () => void;
};

const AuthenticatedActions: React.FC<AuthenticatedActionsProps> = ({
  className,
  onClose,
}) => {
  const session = useSession();

  if (session.status !== "authenticated") {
    return null;
  }

  return (
    <>
      <Link
        href="/"
        className="transition hover:text-black-500"
        onClick={onClose}
      >
        Home
      </Link>
      <Link
        href="/search"
        className="transition hover:text-black-500"
        onClick={onClose}
      >
        Connect
      </Link>

      <Link
        href="/article/create"
        className="w-full rounded-md bg-primary-500 px-4 py-2 text-center font-medium tracking-widest text-white transition hover:bg-primary-400"
        onClick={onClose}
      >
        Write
      </Link>

      <Search from="0px" to="150px" />
      <FavoritesIcon />
      <ProfileIconButton className={className} user={session.data.user} />
    </>
  );
};

export { AuthenticatedActions };
