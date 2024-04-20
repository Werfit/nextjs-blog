"use client";

import { usePathname, useRouter } from "next/navigation";
import { Session } from "next-auth";

import { Icon } from "@/components/icon/icon.component";
import { combineClassNames } from "@/utils/class-name.util";

type AsideNavigationProps = {
  className?: string;
  user?: Session["user"];
  params: {
    id: string;
  };
};

enum ProfileSettingsPathnames {
  PROFILE = "/",
  PASSWORD = "/security",
  ARTICLES = "/articles",
}

const AsideNavigation: React.FC<AsideNavigationProps> = ({
  className,
  params,
  user,
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const isProfilePage =
    !pathname.endsWith(ProfileSettingsPathnames.PASSWORD) &&
    !pathname.endsWith(ProfileSettingsPathnames.ARTICLES);

  return (
    <aside className={className}>
      <ul className="rounded-md border bg-white">
        <li
          className={combineClassNames(
            "flex cursor-pointer items-center gap-2 px-4 py-1 tracking-wide transition hover:bg-lightGray-50",
            isProfilePage ? "bg-slate-50" : "",
          )}
          onClick={() => router.push(`/user/${params.id}`)}
        >
          <Icon name="account_circle" /> Profile
        </li>
        <li className="block h-[0.1rem] rounded-md bg-lightGray-100"></li>
        <li
          className={combineClassNames(
            "flex cursor-pointer items-center gap-2 px-4 py-1 tracking-wide transition hover:bg-lightGray-50",
            pathname.endsWith(ProfileSettingsPathnames.ARTICLES)
              ? "bg-slate-50"
              : "",
          )}
          onClick={() =>
            router.push(
              `/user/${params.id}/${ProfileSettingsPathnames.ARTICLES}`,
            )
          }
        >
          <Icon name="article" /> Articles
        </li>
        {user && user.id === params.id && (
          <>
            <li className="block h-[0.1rem] rounded-md bg-lightGray-100"></li>
            <li
              className={combineClassNames(
                "flex cursor-pointer items-center gap-2 px-4 py-1 tracking-wide transition hover:bg-lightGray-50",
                pathname.endsWith(ProfileSettingsPathnames.PASSWORD)
                  ? "bg-slate-50"
                  : "",
              )}
              onClick={() =>
                router.push(
                  `/user/${params.id}/${ProfileSettingsPathnames.PASSWORD}`,
                )
              }
            >
              <Icon name="lock" /> Password
            </li>
          </>
        )}
      </ul>
    </aside>
  );
};

export { AsideNavigation };
