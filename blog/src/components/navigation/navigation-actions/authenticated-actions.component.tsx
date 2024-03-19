"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { Search } from "@/components/search/search-icon.component";
import { FavoritesIcon } from "@/components/favorites/favorites-icon.component";
import { FavoritesList } from "@/components/favorites/favorites-list.component";
import { ProfileIconButton } from "../profile-button/icon.component";

type AuthenticatedActionsProps = {
  className?: string;
};

const AuthenticatedActions: React.FC<AuthenticatedActionsProps> = ({
  className,
}) => {
  const session = useSession();

  if (session.status !== "authenticated") {
    return null;
  }

  return (
    <div className="hidden items-center justify-end gap-2 sm:flex md:col-span-3">
      <Link
        href="/article/create"
        className="mr-3 rounded-md bg-primary-500 px-4 py-2 text-center font-medium tracking-widest text-white transition hover:bg-primary-400 sm:px-4"
      >
        <span className="hidden sm:inline">Write</span>
      </Link>

      <Search from="0px" to="150px" />
      <FavoritesIcon>
        <FavoritesList />
      </FavoritesIcon>
      <ProfileIconButton className={className} user={session.data.user} />
    </div>
  );
};

export { AuthenticatedActions };
