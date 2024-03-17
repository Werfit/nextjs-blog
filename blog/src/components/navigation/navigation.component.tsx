import Image from "next/image";
import { Arvo } from "next/font/google";
import { AuthButtons } from "@/components/navigation/auth-buttons.component";
import Logo from "@/assets/images/logo.svg";
import Link from "next/link";
import { Search } from "@/components/search/search-icon.component";
import { FavoritesIcon } from "@/components/favorites/favorites-icon.component";
import { FavoritesList } from "../favorites/favorites-list.component";
import { ActionsIcon } from "./mobile/actions-icon";
import { combineClassNames } from "@/utils/class-name.util";

const caveat = Arvo({
  weight: "400",
  subsets: ["latin"],
});

type NavigationProps = {
  className?: string;
};

const Navigation: React.FC<NavigationProps> = ({ className }) => (
  <nav className="grid-container !col-start-[full-screen] col-end-[full-screen] w-full bg-white shadow-sm shadow-black-500/10">
    <div
      className={combineClassNames(
        `!col-start-[container] col-end-[container] grid grid-cols-2 items-center justify-between gap-8 bg-white py-2 sm:px-0 md:!col-start-[full-screen] md:col-end-[full-screen] md:grid-cols-7 lg:grid-cols-9`,
        className,
      )}
    >
      <Link
        href="/"
        className="flex flex-grow items-center gap-2 md:col-span-2"
      >
        <Image src={Logo} alt="Logo" width={20} />
        <h2 className={caveat.className}>Werfit Blog</h2>
      </Link>

      <div className="hidden grid-cols-subgrid items-center md:col-span-5 md:grid lg:col-span-7">
        <div className="text-black col-span-2 flex justify-center gap-4 font-medium tracking-wider text-[#333f48] md:col-span-2 lg:col-span-4">
          <Link href="/" className="transition hover:text-black-500">
            Home
          </Link>
          <Link href="#" className="transition hover:text-black-500">
            Connect
          </Link>
        </div>
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
          <AuthButtons />
        </div>
      </div>

      <div className="text-right md:hidden">
        <ActionsIcon
          favoritesList={<FavoritesList />}
          className="cursor-pointer"
        />
      </div>
    </div>
  </nav>
);

export { Navigation };
