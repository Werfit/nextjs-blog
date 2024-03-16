import Image from "next/image";
import { Arvo } from "next/font/google";
import { AuthButtons } from "@/components/navigation/auth-buttons.component";
import Logo from "@/assets/images/logo.svg";
import Link from "next/link";
import { Search } from "@/components/search/search.component";
import { FavoritesIcon } from "@/components/favorites/favorites-icon.component";
import { FavoritesList } from "../favorites/favorites-list.component";
import { ActionsIcon } from "./mobile/actions-icon";
import { Icon } from "../icon/icon.component";

const caveat = Arvo({
  weight: "400",
  subsets: ["latin"],
});

type NavigationProps = {
  className?: string;
};

const Navigation: React.FC<NavigationProps> = ({ className }) => (
  <nav
    className={`!col-start-[container-start] col-end-[container-end] grid grid-cols-2 items-center justify-between gap-8 py-5 sm:px-0 md:!col-start-[full-screen] md:col-end-[full-screen] md:grid-cols-7 lg:grid-cols-9 ${
      className ?? ""
    }`}
  >
    <Link href="/" className="flex flex-grow items-center gap-2">
      <Image src={Logo} alt="Logo" width={20} />
      <h2 className={caveat.className}>Werfit Blog</h2>
    </Link>

    <div className="hidden grid-cols-subgrid items-center md:col-span-6 md:grid lg:col-span-8">
      <div className="text-black col-span-2 flex justify-center gap-4 tracking-wider md:col-span-3 lg:col-span-5">
        <Link href="/" className="transition hover:text-black-500">
          Home
        </Link>
        <Link href="#" className="transition hover:text-black-500">
          Connect
        </Link>
      </div>
      <Link
        href="/article/create"
        className="hidden rounded-md bg-primary-500 px-1 py-2 text-center font-medium tracking-widest text-white transition hover:bg-primary-400 sm:block sm:px-4"
      >
        <span className="hidden sm:inline">Write</span>
      </Link>
      <div className="hidden items-center justify-center gap-2 sm:flex md:col-span-2">
        <Search from="0px" to="150px" />
        <FavoritesIcon>
          <FavoritesList />
        </FavoritesIcon>
        <AuthButtons />
      </div>
    </div>

    <div className="text-right md:hidden">
      <ActionsIcon className="cursor-pointer" />
    </div>
  </nav>
);

export { Navigation };
